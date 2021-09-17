import { ErrorCode } from '~/backend/helper/error'
import { getAll } from '~/backend/helper/kv'
import { internalWorkerError, okJson } from '~/backend/helper/response'
import { Page } from '~/types'

export const get = async (): Promise<Response> => {
  let result: Page[]

  try {
    result = await getAll()
    return okJson(result.reverse())
  } catch (e) {
    return internalWorkerError(ErrorCode.E_FAILED_FETCH_PAGEDATA)
  }
}
