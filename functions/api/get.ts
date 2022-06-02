import { AppError } from '../../util/app-error'
import { getClipData } from '../../util/kv-repository'

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const clipData = await getClipData(env.KV_CLIP_DATA).catch(() => {
    throw AppError.ErrKvGetClipDataFailure
  })

  return new Response(JSON.stringify(clipData ?? []), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
