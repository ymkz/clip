import { clipDeleteSchema } from '@clip/common'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { deleteClipImage, deleteClipItem } from '../../helpers/kv'
import { ClipServerBindings } from '../../helpers/types'

export const remove = new Hono<{ Bindings: ClipServerBindings }>().delete(
  '/remove',
  zValidator('json', clipDeleteSchema),
  async (ctx) => {
    const { id } = ctx.req.valid('json')

    await Promise.all([
      deleteClipItem(ctx.env.KV_CLIP, id),
      deleteClipImage(ctx.env.KV_CLIP, id),
    ])

    return ctx.jsonT({ success: true })
  }
)
