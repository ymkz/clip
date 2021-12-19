import { AppError } from "~/helpers/error"
import { getAll } from "~/helpers/kv"
import { Env } from "~/types/worker"

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const currentList = await getAll(env.DB).catch(() => {
    throw AppError.KV_GET_ALL_ERROR
  })

  return new Response(JSON.stringify(currentList))
}
