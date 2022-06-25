import { Handler } from 'hono'
import { getClipData } from '../utils/kv-repository'

export const get: Handler<never, Env> = async (ctx) => {
  const clipData = await getClipData(ctx.env.KV_CLIP_DATA)
  return ctx.json(clipData)
}
