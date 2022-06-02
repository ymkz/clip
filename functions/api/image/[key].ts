import { AppError } from '../../../util/app-error'
import { getClipImage } from '../../../util/kv-repository'

export const onRequestGet: PagesFunction<Env, 'key'> = async ({
  env,
  params,
}) => {
  if (Array.isArray(params.key)) {
    throw AppError.ErrRequestParamParseFailure
  }

  const clipImage = await getClipImage(env.KV_CLIP_DATA, params.key).catch(
    () => {
      throw AppError.ErrKvGetClipImageFailure
    }
  )

  return new Response(clipImage.value, {
    headers: {
      'Content-Type':
        clipImage.metadata?.contentType ?? 'application/octet-stream',
      'Cache-Control': 'max-age=1209600', // 6hour
    },
  })
}
