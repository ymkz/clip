import { E } from '../../utils/error'
import { getClipImage } from '../../utils/kv-repository'

export const respondImage: PagesFunction<Env, 'key'> = async (ctx) => {
  if (Array.isArray(ctx.params.key)) {
    throw E.RequestParamParseFailure
  }

  const clipImage = await getClipImage(ctx.env.KV_CLIP_DATA, ctx.params.key)

  return new Response(clipImage.value, {
    status: 200,
    headers: {
      'Cache-Control': 'max-age=1209600', // 6hour
      'Content-Type':
        clipImage.metadata?.contentType ?? 'application/octet-stream',
    },
  })
}
