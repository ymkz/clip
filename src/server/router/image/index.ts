import { Handler } from 'hono'
import { getClipImage } from '../../helper/kv'

export const imageHandler: Handler<'key', Env> = async (ctx) => {
  const key = ctx.req.param('key')

  const image = await getClipImage(ctx.env.KV_CLIP, key)

  return ctx.body(image.src, 200, {
    'Cache-Control': 'max-age=1209600', // 6hour
    'Content-Type': image.contentType,
  })
}
