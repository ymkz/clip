import { Request } from 'itty-router'
import { ErrorCode } from '~/api/helper/error'
import { uploadImage } from '~/api/helper/image'
import { addOne, updateOneOfImageUrl } from '~/api/helper/kv'
import { scrapePageData } from '~/api/helper/parse'
import { badRequest, internalWorkerError, ok } from '~/api/helper/response'
import { PageData } from '~/types/page-data'

type Body = {
  url: string
}

export const add = async (
  req: Request,
  event: FetchEvent
): Promise<Response> => {
  let body: Body
  let result: PageData

  try {
    body = await req.json?.()
  } catch (e) {
    console.error(ErrorCode.E_BAD_REQUEST_BODY_ON_ADD)
    return badRequest(ErrorCode.E_BAD_REQUEST_BODY_ON_ADD)
  }

  try {
    result = await scrapePageData(body.url)
  } catch (e) {
    return internalWorkerError(ErrorCode.E_FAILED_FETCH_PAGEDATA)
  }

  try {
    await addOne(result)
  } catch (e) {
    return internalWorkerError(ErrorCode.E_FAILED_ADD_ONE_TO_KV)
  }

  if (ENVIRONMENT === 'production' && result.imageUrl) {
    const task = async () => {
      const uploadedImageUrl = await uploadImage(result)
      await updateOneOfImageUrl(result.id, uploadedImageUrl)
    }
    event.waitUntil(task())
  }

  return ok()
}
