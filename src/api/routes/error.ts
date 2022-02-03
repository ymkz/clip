import { MiddlewareHandler } from "hono"
import { AppErrorType } from "~/api/utils/error"

export const handleError: MiddlewareHandler = async (ctx, next) => {
  await next().catch((err: AppErrorType) => {
    console.error({ error: { reason: err.reason } })
    ctx.res = ctx.json({ error: { reason: err.reason } }, err.status)
  })
}
