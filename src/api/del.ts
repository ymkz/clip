import { Context } from 'hono'
import { AppError } from '~/api/clip-error'
import { removeImage } from '~/api/clip-image'
import { removeOne } from '~/api/clip-kv'

export async function removeClip(ctx: Context<never>) {
  const { id } = await ctx.req.json<{ id: string }>().catch(() => {
    throw AppError.ErrRequestBodyParseFailure
  })

  if (!id) {
    throw AppError.ErrRequestBodyIdMissing
  }

  await removeOne(DB, id).catch(() => {
    throw AppError.ErrKvRemoveOneFailure
  })

  if (ENVIRONMENT === 'production') {
    const task = async () => {
      await removeImage(id, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)
    }
    ctx.event.waitUntil(task())
  }

  return ctx.json([{ msg: 'clip delete succeeded' }])
}
