import { Clip, clipAddSchema } from '@clip/common'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { getClipInfo } from '../../helpers/clip'
import { addClipImage, addClipItem } from '../../helpers/kv'
import { ClipServerBindings } from '../../helpers/types'

export const add = new Hono<{ Bindings: ClipServerBindings }>().post(
  '/add',
  zValidator('json', clipAddSchema),
  async (ctx) => {
    const { url } = ctx.req.valid('json')

    const clipInfo = await getClipInfo(url)

    if (clipInfo.image) {
      await addClipImage(ctx.env.KV_CLIP, clipInfo.id, clipInfo.image)
    }

    const clip: Clip = {
      id: clipInfo.id,
      url: clipInfo.url,
      title: clipInfo.title,
      description: clipInfo.description,
      hasImage: Boolean(clipInfo.image),
    }

    await addClipItem(ctx.env.KV_CLIP, clip)

    return ctx.json({ success: true, clip })
  }
)
