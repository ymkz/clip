import { AppError } from '../../util/app-error'
import { fetchClipImage } from '../../util/fetch-clip-image'
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

  const id = Date.now().toString()

  const fetchedClipInfo = await fetchClipInfo(url).catch(() => {
    throw AppError.ErrFetchClipInfoFailure
  })

  const fetchedClipImage = await fetchClipImage(fetchedClipInfo.imageUrl)

  if (fetchedClipImage.image && fetchedClipImage.contentType) {
    await addClipImage(
      env.KV_CLIP_DATA,
      id,
      fetchedClipImage.image,
      fetchedClipImage.contentType
    )
  }

  const clipItem: ClipItem = {
    id,
    url,
    title: fetchedClipInfo.title,
    description: fetchedClipInfo.description,
    hasImage: Boolean(fetchedClipImage.image),
  }

  await addClipItem(env.KV_CLIP_DATA, clipItem).catch(() => {
    throw AppError.ErrKvAddClipItemFailure
  })

  return new Response(JSON.stringify({ message: 'clip add succeeded' }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
