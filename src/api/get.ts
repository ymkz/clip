import { Context } from 'hono'
import { AppError } from '~/api/clip-error'
import { getAll } from '~/api/clip-kv'

export async function getClips(ctx: Context<never>) {
  const clips = await getAll(DB).catch(() => {
    throw AppError.ErrKvGetAllFailure
  })

  return ctx.json(clips)
}
