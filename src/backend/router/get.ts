import { ErrorCode } from '~/backend/helper/error'
import { getAll } from '~/backend/helper/kv'

export const get = async (): Promise<Response> => {
  const currentList = await getAll().catch(() => {
    throw ErrorCode.KV_GET_ALL_ERROR
  })

  return new Response(JSON.stringify(currentList))
}
