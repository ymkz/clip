import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { z } from 'zod'
import { ClipBatchBindings } from './types'

export const app = new Hono<{ Bindings: ClipBatchBindings }>()

app.get('/', async (ctx) => {
  const ua = await ctx.env.KV_CLIP.get('user-agent', 'text').catch((err) => {
    throw new Error('failed to get KV_CLIP::user-agent', { cause: err })
  })

  return ctx.text(ua ?? 'USER_AGENT_IS_NOT_FOUND')
})

app.put('/', zValidator('json', z.object({ ua: z.string() })), async (ctx) => {
  const { ua } = ctx.req.valid('json')

  await ctx.env.KV_CLIP.put('user-agent', ua).catch((err) => {
    throw new Error('failed to put KV_CLIP::user-agent', { cause: err })
  })

  return ctx.json({ success: true, ua })
})

app.onError((err, ctx) => {
  console.error(err)
  return ctx.json({ reason: err.message }, 500)
})
