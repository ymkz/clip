import { E } from '../../utils/error'
import { fetchClipInfo } from '../../utils/get-clip-info'
import { addClipImage, addClipItem } from '../../utils/kv-repository'

export const apiAdd: PagesFunction<Env> = async (ctx) => {
  const { url } = await ctx.request.json<ApiAddRequestBody>().catch(() => {
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

  return new Response(JSON.stringify({ message: 'clip add succeeded' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
