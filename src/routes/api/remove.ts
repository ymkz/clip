import { ActionFunction, json, redirect } from "remix"
import { ClipError } from "~/utils/clip-error"
import { removeImage } from "~/utils/clip-image"
import { removeOne } from "~/utils/clip-kv"

type Body = {
  id: string
}

export const action: ActionFunction = async ({ context, request }) => {
  try {
    const formData = await request.formData().catch(() => {
      throw new ClipError("request formData can not parse", 400)
    })

    const id = formData.get("id")?.toString()

    if (!id) {
      throw new ClipError("request formData <id> is required", 400)
    }

    await removeOne(DB, id).catch(() => {
      throw new ClipError("failed to remove item from kv", 500)
    })

    if (ENVIRONMENT === "production") {
      const task = async () => {
        await removeImage(id, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
      }
      context.waitUntil(task())
    }
  } catch (err) {
    if (err instanceof ClipError) {
      console.error(err)
      return json({ error: { reason: err.reason } }, err.status)
    }
    console.error("unexpected error")
    return json({ error: { reason: "unexpected error" } }, 500)
  }

  return redirect("/")
}
