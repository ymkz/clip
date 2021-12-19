import { AppErrorType } from "~/helpers/error"
import { Env } from "~/types/worker"

const errorHandler: PagesFunction<Env> = async ({ next }) => {
  return await next().catch((error: AppErrorType) => {
    console.error(`ERROR: ${error}`)
    switch (error) {
      case "KV_GET_ALL_ERROR":
      case "KV_ADD_ONE_ERROR":
      case "KV_REMOVE_ONE_ERROR":
      case "FETCH_PAGE_ERROR": {
        return new Response(error, { status: 500 })
      }
      case "REQUEST_BODY_MISSING_ERROR": {
        return new Response(error, { status: 400 })
      }
      default: {
        return new Response("INTERNAL_WORKER_ERROR", { status: 500 })
      }
    }
  })
}

const pagesDevHostValidator: PagesFunction<Env> = async ({ request, next }) => {
  if (new URL(request.url).hostname.includes("pages.dev")) {
    console.error(`ERROR: access on pages.dev is forbidden`)
    return new Response(`Forbidden`, { status: 403 })
  }
  return await next()
}

export const onRequest = [errorHandler, pagesDevHostValidator]
