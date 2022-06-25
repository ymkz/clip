import { Handler } from 'hono'
import { E } from '../utils/app-error'
import { fetchClipInfo } from '../utils/get-clip-info'
import { addClipImage, addClipItem } from '../utils/kv-repository'

type RequestBody = {
  url?: string
}

export const add: Handler<never, Env> = async (ctx) => {
  const { url } = await ctx.req.json<RequestBody>().catch(() => {
    throw E.RequestBodyParseFailure
  })

  if (!url) {
    throw E.RequestBodyUrlMissing
  }

  const clipInfo = await fetchClipInfo(url)

  if (clipInfo.image) {
    await addClipImage(ctx.env.KV_CLIP_DATA, clipInfo.id, clipInfo.image)
  }

  await addClipItem(ctx.env.KV_CLIP_DATA, {
    id: clipInfo.id,
    url: clipInfo.url,
    title: clipInfo.title,
    description: clipInfo.description,
    hasImage: Boolean(clipInfo.image),
  })

  return ctx.json({ message: 'clip add succeeded' })
}
