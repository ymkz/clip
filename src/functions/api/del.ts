import { E } from '../../utils/error'
import { deleteClipImage, deleteClipItem } from '../../utils/kv-repository'

export const apiDel: PagesFunction<Env> = async (ctx) => {
  const { id } = await ctx.request.json<ApiDelRequestBody>().catch(() => {
    throw E.RequestBodyParseFailure
  })

  if (!id) {
    throw E.RequestBodyIdMissing
  }

  await Promise.all([
    deleteClipItem(ctx.env.KV_CLIP_DATA, id),
    deleteClipImage(ctx.env.KV_CLIP_DATA, id),
  ])

  return new Response(JSON.stringify({ message: 'clip delete succeeded' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
