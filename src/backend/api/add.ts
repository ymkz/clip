import { Request } from 'itty-router'
import { ErrorCode } from '~/backend/helper/error'
import { uploadImage } from '~/backend/helper/image'
import { addOne, updateOneOfImageUrl } from '~/backend/helper/kv'
import { scrapePageData } from '~/backend/helper/parse'
import { badRequest, internalWorkerError, ok } from '~/backend/helper/response'
import { Page } from '~/types'

type Body = {
  url: string
}

export const add = async (
  req: Request,
  event: FetchEvent
): Promise<Response> => {
  let body: Body
  let result: Page

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
