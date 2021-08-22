import { ErrorCode } from '~/api/helper/error'
import { getAll } from '~/api/helper/kv'
import { internalWorkerError, okJson } from '~/api/helper/response'
import { PageData } from '~/types/page-data'

export const get = async (): Promise<Response> => {
  let result: PageData[]

  try {
    result = await getAll()
    return okJson(result.reverse())
  } catch (e) {
    return internalWorkerError(ErrorCode.E_FAILED_FETCH_PAGEDATA)
  }
}
