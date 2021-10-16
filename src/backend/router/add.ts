import { Request } from 'itty-router'
import { ErrorCode } from '~/backend/helper/error'
import { uploadImage } from '~/backend/helper/image'
import { addOne, updateOneOfImageUrl } from '~/backend/helper/kv'
import { fetchPage } from '~/backend/helper/parse'

type Body = {
  url: string
}

export const add = async (
  req: Request,
  event: FetchEvent
): Promise<Response> => {
  const body: Body = await req.json?.().catch(() => {
    throw ErrorCode.REQUEST_BODY_MISSING_ERROR
  })

  const result = await fetchPage(body.url).catch(() => {
    throw ErrorCode.PAGE_FETCH_ERROR
  })

  await addOne(result).catch(() => {
    throw ErrorCode.KV_ADD_ONE_ERROR
  })

  if (ENVIRONMENT === 'production' && result.imageUrl) {
    const task = async () => {
      const uploadedImageUrl = await uploadImage(result)
      await updateOneOfImageUrl(result.id, uploadedImageUrl)
    }
    event.waitUntil(task())
  }

  return new Response('OK')
}
