import { AppError } from "~/helpers/error"
import { uploadImage } from "~/helpers/image"
import { addOne, updateOneOfImageUrl } from "~/helpers/kv"
import { fetchPage } from "~/helpers/page"
import { Env, PostBody } from "~/types/worker"

export const onRequestPost: PagesFunction<Env> = async ({
  env,
  request,
  waitUntil,
}) => {
  const body = await request.json<PostBody>().catch(() => {
    throw AppError.REQUEST_BODY_MISSING_ERROR
  })

  const page = await fetchPage(body.url).catch(() => {
    throw AppError.FETCH_PAGE_ERROR
  })

  await addOne(env.DB, page).catch(() => {
    throw AppError.KV_ADD_ONE_ERROR
  })

  if (env.TYPE === "production" && page.imageUrl) {
    const task = async () => {
      const uploadedImageUrl = await uploadImage(page)
      await updateOneOfImageUrl(env.DB, page.id, uploadedImageUrl)
    }
    waitUntil(task())
  }

  return new Response("ADD SUCCEEDED")
}
