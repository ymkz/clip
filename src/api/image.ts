import { Handler } from 'hono'
import { getClipImage } from '../utils/kv-repository'

export const image: Handler<'key', Env> = async (ctx) => {
  const clipImage = await getClipImage(
    ctx.env.KV_CLIP_DATA,
    ctx.req.param('key')
  )

  return ctx.body(clipImage.value, 200, {
    'Content-Type':
      clipImage.metadata?.contentType ?? 'application/octet-stream',
    'Cache-Control': 'max-age=1209600', // 6hour
  })
}
