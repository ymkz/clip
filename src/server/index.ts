import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static.module'
import { FetchError, KVError } from './helper/error'
import { addHandler } from './router/api/add'
import { imageHandler } from './router/image'
import { trpcHandler } from './router/trpc'

const app = new Hono<Env>()

app.post('/api/add', addHandler)

app.get('/image/:key', imageHandler)

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
