import { Handler } from 'hono'
import { ClipAddSchema } from '../../schema/clip'
import { getClipInfo } from '../helper/clip'
import { addClipImage, addClipItem } from '../helper/kv'

export const addHandler: Handler<Env> = async (ctx) => {
  const { url } = await ctx.req.json<ClipAddSchema>().catch(() => {
    // TODO: ここでレスポンスするのではなくカスタム例外を投げて、グローバルエラーハンドラに処理を移譲したい
    return ctx.body('failed to parse request body', 400)
  })

  if (!url) {
    // TODO: ここでレスポンスするのではなくカスタム例外を投げて、グローバルエラーハンドラに処理を移譲したい
    return ctx.body('missing request body [url]', 400)
  }

  const clipInfo = await getClipInfo(url)

  if (clipInfo.image) {
    await addClipImage(ctx.env.KV_CLIP, clipInfo.id, clipInfo.image)
  }

  await addClipItem(ctx.env.KV_CLIP, {
    id: clipInfo.id,
    url: clipInfo.url,
    title: clipInfo.title,
    description: clipInfo.description,
    hasImage: Boolean(clipInfo.image),
  })

  return ctx.json({ ok: true }, 201)
}
