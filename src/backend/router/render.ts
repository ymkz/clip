import { getAssetFromKV, NotFoundError } from '@cloudflare/kv-asset-handler'
import { Request } from 'itty-router'
import { ErrorCode } from '~/backend/helper/error'

export const render = async (
  _: Request,
  event: FetchEvent
): Promise<Response> => {
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    if (e instanceof NotFoundError) {
      throw ErrorCode.KV_ASSET_NOT_FOUND_ERROR
    } else {
      throw ErrorCode.UNKNOWN_ERROR
    }
  }
}
