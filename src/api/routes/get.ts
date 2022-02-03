import { Handler } from "hono"
import { getAll } from "~/api/utils/kv"

export const getClip: Handler = async (ctx) => {
  const data = await getAll(DB)
  return ctx.json(data)
}
