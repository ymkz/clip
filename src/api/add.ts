import { Context } from 'hono'
import { AppError } from '~/api/clip-error'
import { fetchClipItem } from '~/api/clip-fetch'
import { uploadImage } from '~/api/clip-image'
import { addOne, updateOneOfImageUrl } from '~/api/clip-kv'

export async function addClip(ctx: Context<never>) {
  const { url } = await ctx.req.json<{ url: string }>().catch(() => {
    throw AppError.ErrRequestBodyParseFailure
  })

  if (!url) {
    throw AppError.ErrRequestBodyUrlMissing
  }

  const clipItem = await fetchClipItem(url).catch(() => {
    throw AppError.ErrFetchClipItemFailure
  })

  await addOne(DB, clipItem).catch(() => {
    throw AppError.ErrKvAddOneFailure
  })

  if (ENVIRONMENT === 'production' && clipItem.imageUrl) {
    const task = async () => {
      const uploadedImageUrl = await uploadImage(clipItem)
      await updateOneOfImageUrl(DB, clipItem.id, uploadedImageUrl)
    }
    ctx.event.waitUntil(task())
  }

  return ctx.json({ msg: 'clip add succeeded' })
}
