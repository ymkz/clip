import { ErrorCode } from '~/api/helper/error'
import { getAll } from '~/api/helper/kv'
import { internalWorkerError, okJson } from '~/api/helper/response'
import { Page } from '~/types/page'

export const get = async (): Promise<Response> => {
  let result: Page[]

  try {
    result = await getAll()
    return okJson(result.reverse())
  } catch (e) {
    return internalWorkerError(ErrorCode.E_FAILED_FETCH_PAGEDATA)
  }
}
