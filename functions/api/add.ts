import { AppError } from '../../util/app-error'
import { fetchClipInfo } from '../../util/fetch-clip-info'
import { addClipImage, addClipItem } from '../../util/kv-repository'

type RequestBody = {
  url?: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { url } = await request.json<RequestBody>().catch(() => {
    throw AppError.ErrRequestBodyParseFailure
  })

  if (!url) {
    throw AppError.ErrRequestBodyUrlMissing
  }

  const fetchedClipInfo = await fetchClipInfo(url).catch(() => {
    throw AppError.ErrFetchClipInfoFailure
  })

  const id = Date.now().toString()

  const clipItem: ClipItem = {
    id,
    url,
    title: fetchedClipInfo.title,
    description: fetchedClipInfo.description,
    hasImage: Boolean(fetchedClipInfo.imageUrl),
  }

  await addClipItem(env.KV_CLIP_DATA, clipItem).catch(() => {
    throw AppError.ErrKvAddClipItemFailure
  })

  if (fetchedClipInfo.imageUrl) {
    const response = await fetch(fetchedClipInfo.imageUrl)
    const image = await response.arrayBuffer()

    await addClipImage(
      env.KV_CLIP_DATA,
      id,
      image,
      response.headers.get('Content-Type') ?? 'application/octet-stream'
    )
  }

  return new Response(JSON.stringify({ message: 'clip add succeeded' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
