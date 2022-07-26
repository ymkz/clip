import { respondImage } from '../src/functions/image'

export const onRequestGet: PagesFunction<Env> = async (ctx) => {
  return respondImage(ctx)
}
