import { AppError } from '../../util/app-error'
import { deleteClipImage, deleteClipItem } from '../../util/kv-repository'

type RequestBody = {
  id?: string
}

export const onRequestDelete: PagesFunction<Env> = async ({ request, env }) => {
  const { id } = await request.json<RequestBody>().catch(() => {
    throw AppError.ErrRequestBodyParseFailure
  })

  if (!id) {
    throw AppError.ErrRequestBodyIdMissing
  }

  await Promise.all([
    deleteClipItem(env.KV_CLIP_DATA, id).catch(() => {
      throw AppError.ErrKvDeleteClipItemFailure
    }),
    deleteClipImage(env.KV_CLIP_DATA, id).catch(() => {
      throw AppError.ErrKvDeleteClipImageFailure
    }),
  ])

  return new Response(JSON.stringify({ message: 'clip delete succeeded' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
