import { Handler } from "hono"
import { AppError } from "~/api/utils/error"
import { fetchPage } from "~/api/utils/fetch"
import { uploadImage } from "~/api/utils/image"
import { addOne, updateOneOfImageUrl } from "~/api/utils/kv"

export const postClip: Handler = async (ctx) => {
  const body = await ctx.req.json<{ url: string }>().catch(() => {
    throw AppError.REQUEST_BODY_PARSE_ERROR
  })

  if (!("url" in body)) {
    throw AppError.REQUEST_BODY_URL_MISSING_ERROR
  }

  const clipItem = await fetchPage(body.url).catch(() => {
    throw AppError.FETCH_PAGE_INFO_ERROR
  })

  await addOne(DB, clipItem).catch(() => {
    throw AppError.KV_ADD_ONE_ERROR
  })

  if (ENVIRONMENT === "production" && clipItem.imageUrl) {
    const task = async () => {
      const uploadedImageUrl = await uploadImage(clipItem)
      await updateOneOfImageUrl(DB, clipItem.id, uploadedImageUrl)
    }
    ctx.event.waitUntil(task())
  }

  return ctx.json({ message: "clip add succeeded" })
}
