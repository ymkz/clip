import { apiDel } from '../../src/functions/api/del'

export const onRequestDelete: PagesFunction<Env> = async (ctx) => {
  return apiDel(ctx)
}
