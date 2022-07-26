import { apiAdd } from '../../src/functions/api/add'

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  return apiAdd(ctx)
}
