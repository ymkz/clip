import { initTRPC } from '@trpc/server'
import { clipRemoveSchema } from '../../schema/clip'
import { deleteClipImage, deleteClipItem, getClipData } from '../helper/kv'
import { TrpcContext } from './context'

const t = initTRPC.context<TrpcContext>().create()

const router = t.router
const publicProcedure = t.procedure

const clipRouter = router({
  list: publicProcedure.query(async ({ ctx }) => {
    const clips = await getClipData(ctx.env.KV_CLIP)
    return { clips }
  }),
  remove: publicProcedure
    .input(clipRemoveSchema)
    .mutation(async ({ ctx, input }) => {
      await Promise.all([
        deleteClipItem(ctx.env.KV_CLIP, input.id),
        deleteClipImage(ctx.env.KV_CLIP, input.id),
      ])
    }),
})

export const appRouter = router({
  clip: clipRouter,
})

export type AppRouter = typeof appRouter
