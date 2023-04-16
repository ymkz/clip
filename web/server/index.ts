import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import { add } from './routes/api/add'
import { list } from './routes/api/list'
import { remove } from './routes/api/remove'
import { image } from './routes/image/key'

const app = new Hono()

app.route('/api', list)
app.route('/api', add)
app.route('/api', remove)
app.route('/image', image)

app.get('*', serveStatic())

app.onError((err, ctx) => {
  console.error(err)
  return ctx.json({ reason: err.message }, 500)
})

export type ClipServerRoutes = typeof list | typeof remove

export default app
