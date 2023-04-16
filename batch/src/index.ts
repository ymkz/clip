import { app } from './fetch'
import { scheduled } from './scheduled'
import { ClipBatchBindings } from './types'

const worker: ExportedHandler<ClipBatchBindings> = {
  fetch: app.fetch,
  scheduled: (_, env, ctx) => ctx.waitUntil(scheduled(env)),
}

export default worker
