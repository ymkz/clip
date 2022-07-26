import { getClipData } from '../../utils/kv-repository'

export const apiGet: PagesFunction<Env> = async (ctx) => {
  const clipData = await getClipData(ctx.env.KV_CLIP_DATA)

  return new Response(JSON.stringify(clipData), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
