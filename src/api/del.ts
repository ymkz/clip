import { Handler } from 'hono'
import { E } from '../utils/app-error'
import { deleteClipImage, deleteClipItem } from '../utils/kv-repository'

type RequestBody = {
  id?: string
}

export const del: Handler<never, Env> = async (ctx) => {
  const { id } = await ctx.req.json<RequestBody>().catch(() => {
    throw E.RequestBodyParseFailure
  })

  if (!id) {
    throw E.RequestBodyIdMissing
  }

  await Promise.all([
    deleteClipItem(ctx.env.KV_CLIP_DATA, id),
    deleteClipImage(ctx.env.KV_CLIP_DATA, id),
  ])

  return ctx.json({ message: 'clip delete succeeded' })
}
