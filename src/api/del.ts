import { Context } from 'hono'
import { AppError } from '~/api/clip-error'
import { removeImage } from '~/api/clip-image'
import { removeOne } from '~/api/clip-kv'

export async function removeClip(ctx: Context<never>) {
  const body = await ctx.req.json<{ id: string }>().catch(() => {
    throw AppError.REQUEST_BODY_PARSE_ERROR
  })

  if (!('id' in body)) {
    throw AppError.REQUEST_BODY_ID_MISSING_ERROR
  }

  await removeOne(DB, body.id).catch(() => {
    throw AppError.KV_REMOVE_ONE_ERROR
  })

  if (ENVIRONMENT === 'production') {
    const task = async () => {
      await removeImage(body.id, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
    }
    ctx.event.waitUntil(task())
  }

  return ctx.json([{ msg: 'clip delete succeeded' }])
}
