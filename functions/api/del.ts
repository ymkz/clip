import { AppError } from "~/helpers/error"
import { removeImage } from "~/helpers/image"
import { removeOne } from "~/helpers/kv"
import { DeleteBody, Env } from "~/types/worker"

export const onRequestDelete: PagesFunction<Env> = async ({
  env,
  request,
  waitUntil,
}) => {
  const body = await request.json<DeleteBody>().catch(() => {
    throw AppError.REQUEST_BODY_MISSING_ERROR
  })

  await removeOne(env.DB, body.id).catch(() => {
    throw AppError.KV_REMOVE_ONE_ERROR
  })

  if (env.TYPE === "production") {
    const task = async () => {
      await removeImage(
        body.id,
        env.CLOUDINARY_API_KEY,
        env.CLOUDINARY_API_SECRET
      )
    }
    waitUntil(task())
  }

  return new Response("DELETE SUCCEEDED")
}
