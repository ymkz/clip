import { Hono } from 'hono'
import { getClipImage } from '../../helpers/kv'
import { ClipServerBindings } from '../../helpers/types'

export const image = new Hono<{ Bindings: ClipServerBindings }>().get(
  '/:key',
  async (ctx) => {
    const key = ctx.req.param('key')

    const image = await getClipImage(ctx.env.KV_CLIP, key)

    return ctx.body(image.src, 200, {
      'Cache-Control': 'max-age=36000', // 10hour
      'Content-Type': image.contentType,
    })
  }
)
