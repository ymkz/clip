import { getAssetFromKV, NotFoundError } from '@cloudflare/kv-asset-handler'
import { Request } from 'itty-router'
import { ErrorCode } from '~/backend/helper/error'
import { internalWorkerError, notFound } from '~/backend/helper/response'

export const index = async (
  req: Request,
  event: FetchEvent
): Promise<Response> => {
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    if (e instanceof NotFoundError) {
      return notFound()
    } else {
      return internalWorkerError(ErrorCode.E_GET_ASSET_FROM_KV)
    }
  }
}
