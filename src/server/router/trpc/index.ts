import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { Handler } from 'hono'
import { createTrpcContext } from './context'
import { appRouter } from './router'

export const trpcHandler: Handler<Env> = (ctx) => {
  return fetchRequestHandler({
    endpoint: '/trpc',
    req: ctx.req,
    router: appRouter,
    createContext: createTrpcContext(ctx),
    onError: ({ error, type, path, req, input, ctx }) => {
      console.error(error)
    },
  })
}
