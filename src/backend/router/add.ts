import { Request } from 'itty-router'
import { FetchEvent } from 'miniflare'
import { ErrorCode } from '~/backend/helper/error'
import { fetchPage } from '~/backend/helper/fetch'
import { uploadImage } from '~/backend/helper/image'
import { addOne, updateOneOfImageUrl } from '~/backend/helper/kv'

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