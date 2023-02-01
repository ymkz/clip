import { inferAsyncReturnType } from '@trpc/server'
import { Context } from 'hono'

export const createTrpcContext = (ctx: Context<string, Env>) => {
  return () => ({
    env: ctx.env,
  })
}

export type TrpcContext = inferAsyncReturnType<typeof createTrpcContext>
