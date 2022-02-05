import { ActionFunction, json } from "remix"
import { ClipError } from "~/utils/clip-error"
import { fetchPage } from "~/utils/clip-fetch"
import { uploadImage } from "~/utils/clip-image"
import { addOne, updateOneOfImageUrl } from "~/utils/clip-kv"

type Body = {
  url: string
}

export const action: ActionFunction = async ({ context, request }) => {
  try {
    const body: Body = await request.json().catch(() => {
      throw new ClipError("request body can not parse as json", 400)
    })

    if (!("url" in body)) {
      throw new ClipError("request body <url> is required", 400)
    }

    const clipItem = await fetchPage(body.url).catch(() => {
      throw new ClipError("failed to fetch page info", 500)
    })

    await addOne(DB, clipItem).catch(() => {
      throw new ClipError("failed to add item to kv", 500)
    })

    // waitUntilで非同期にしたいが、waitUntilがどこからとれるのか不明
    if (ENVIRONMENT === "production" && clipItem.imageUrl) {
      const uploadedImageUrl = await uploadImage(clipItem)
      await updateOneOfImageUrl(DB, clipItem.id, uploadedImageUrl)
    }
  } catch (err) {
    if (err instanceof ClipError) {
      console.error(err)
      return json({ error: { reason: err.reason } }, err.status)
    }
    console.error("unexpected error")
    return json({ error: { reason: "unexpected error" } }, 500)
  }

  return json({ message: "clip add succeeded" })
}
