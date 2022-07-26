import { apiGet } from '../../src/functions/api/get'

export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  return apiGet(ctx)
}
