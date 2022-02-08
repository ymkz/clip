import { ActionFunction, json, redirect } from "remix"
import { removeImage } from "~/utils/clip-image"
import { removeOne } from "~/utils/clip-kv"

export const action: ActionFunction = async ({ context, request }) => {
  const formData = await request.formData().catch(() => {
    throw json({ reason: "request formData can not parse" }, 400)
  })

  const id = formData.get("id")?.toString()

  if (!id) {
    throw json({ reason: "request formData <id> is required" }, 400)
  }

  await removeOne(DB, id).catch(() => {
    throw json({ reason: "failed to remove item from kv" }, 500)
  })

  if (ENVIRONMENT === "production") {
    const task = async () => {
      await removeImage(id, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
    }
    context.waitUntil(task())
  }

  return redirect("/")
}
