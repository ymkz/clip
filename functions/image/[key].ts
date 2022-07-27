import { respondImage } from '../../src/functions/image/key'

export const onRequestGet: PagesFunction<Env, 'key'> = async (ctx) => {
  return respondImage(ctx)
}
