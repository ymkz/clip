import { Context } from 'hono'
import { getAll } from '~/api/clip-kv'

export async function getClips(ctx: Context<never>) {
  const clips = await getAll(DB)
  return ctx.json(clips)
}
