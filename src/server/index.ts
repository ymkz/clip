import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import { addHandler } from './api/add'
import { imageHandler } from './api/image'
import { FetchError, KVError } from './helper/error'
import { trpcHandler } from './trpc/handler'

const app = new Hono<Env>()

app.post('/api/add', addHandler)

app.get('/api/image/:key', imageHandler)

app.all('/trpc/*', trpcHandler)

app.get('*', serveStatic())

app.onError((err, ctx) => {
  console.error(err)

  if (err instanceof KVError || err instanceof FetchError) {
    return ctx.json({ error: err.message }, 500)
  }

  return ctx.json({ error: 'an unexpected error occurred' }, 500)
})

export default app
