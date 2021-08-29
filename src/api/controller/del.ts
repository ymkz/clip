import { Request } from 'itty-router'
import { ErrorCode } from '~/api/helper/error'
import { removeImage } from '~/api/helper/image'
import { removeOne } from '~/api/helper/kv'
import { badRequest, internalWorkerError, ok } from '~/api/helper/response'

type Body = {
  id: string
}

export const del = async (
  req: Request,
  event: FetchEvent
): Promise<Response> => {
  let body: Body

  try {
    body = await req.json?.()
  } catch (e) {
    console.error(ErrorCode.E_BAD_REQUEST_BODY_ON_REMOVE)
    return badRequest(ErrorCode.E_BAD_REQUEST_BODY_ON_REMOVE)
  }

  try {
    await removeOne(body.id)
  } catch (e) {
    return internalWorkerError(ErrorCode.E_FAILED_REMOVE_ONE_FROM_KV)
  }

  if (ENVIRONMENT === 'production') {
    event.waitUntil(removeImage(body.id))
  }

  return ok()
}
