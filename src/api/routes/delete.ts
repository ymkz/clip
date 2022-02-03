import { Handler } from "hono"
import { AppError } from "~/api/utils/error"
import { removeImage } from "~/api/utils/image"
import { removeOne } from "~/api/utils/kv"

export const deleteClip: Handler = async (ctx) => {
  const body = await ctx.req.json<{ id: string }>().catch(() => {
    throw AppError.REQUEST_BODY_PARSE_ERROR
  })

  if (!("id" in body)) {
    throw AppError.REQUEST_BODY_ID_MISSING_ERROR
  }

  await removeOne(DB, body.id).catch(() => {
    throw AppError.KV_REMOVE_ONE_ERROR
  })

  if (ENVIRONMENT === "production") {
    const task = async () => {
      await removeImage(body.id, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
    }
    ctx.event.waitUntil(task())
  }

  return ctx.json({ message: "clip delete succeeded" })
}
