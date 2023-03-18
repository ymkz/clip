import { Hono } from 'hono'
import { getClipData } from '../../helpers/kv'
import { ClipServerBindings } from '../../helpers/types'

export const list = new Hono<{ Bindings: ClipServerBindings }>().get(
  '/list',
  async (ctx) => {
    const clipList = await getClipData(ctx.env.KV_CLIP)
    return ctx.jsonT({ clipList })
  }
)
