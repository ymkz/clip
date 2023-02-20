import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { Clip, clipAddSchema, clipDeleteSchema } from '../schema/clip'
import { getClipInfo } from './helper/clip'
import { FetchError, KVError } from './helper/error'
import {
  addClipImage,
  addClipItem,
  deleteClipImage,
  deleteClipItem,
  getClipData,
  getClipImage,
} from './helper/kv'

const app = new Hono<Env>()

const apiClipList = app.get('/api/clip/list', async (ctx) => {
  const clips = await getClipData(ctx.env.KV_CLIP)
  return ctx.jsonT({ clips })
})

const apiClipDelte = app.delete(
  '/api/clip/delete',
  zValidator('json', clipDeleteSchema),
  async (ctx) => {
    const { id } = ctx.req.valid('json')

    await Promise.all([
      deleteClipItem(ctx.env.KV_CLIP, id),
      deleteClipImage(ctx.env.KV_CLIP, id),
    ])

    return ctx.jsonT({ result: 'deleted' })
  }
)

app.post('/api/clip/add', zValidator('json', clipAddSchema), async (ctx) => {
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

  return ctx.jsonT({ result: 'added' })
})

app.get('/image/:key', async (ctx) => {
  const key = ctx.req.param('key')

  const image = await getClipImage(ctx.env.KV_CLIP, key)

  return ctx.body(image.src, 200, {
    'Cache-Control': 'max-age=36000', // 10hour
    'Content-Type': image.contentType,
  })
})

app.get('*', serveStatic())

app.onError((err, ctx) => {
  console.error(err)

  if (err instanceof KVError || err instanceof FetchError) {
    return ctx.json({ error: err.message }, 500)
  }

  return ctx.json({ error: 'an unexpected error occurred' }, 500)
})

export type ApiType = typeof apiClipList | typeof apiClipDelte

export default app
