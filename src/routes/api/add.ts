import { ActionFunction, json } from "remix"
import { fetchPage } from "~/utils/clip-fetch"
import { uploadImage } from "~/utils/clip-image"
import { addOne, updateOneOfImageUrl } from "~/utils/clip-kv"

type Body = {
  url: string
}

export const action: ActionFunction = async ({ context, request }) => {
  const body: Body = await request.json().catch(() => {
    throw json({ reason: "request body can not parse as json" }, 400)
  })

  if (!("url" in body)) {
    throw json({ reason: "request body <url> is required" }, 400)
  }

  const clipItem = await fetchPage(body.url).catch(() => {
    throw json({ reason: "request body <url> is required" }, 500)
  })

  await addOne(DB, clipItem).catch(() => {
    throw json({ reason: "failed to add item to kv" }, 500)
  })

  if (ENVIRONMENT === "production" && clipItem.imageUrl) {
    const task = async () => {
      const uploadedImageUrl = await uploadImage(clipItem)
      await updateOneOfImageUrl(DB, clipItem.id, uploadedImageUrl)
    }
    context.waitUntil(task())
  }

  return json({ message: "clip add succeeded" })
}
