import { Hono } from 'hono'
import { add } from './api/add'
import { del } from './api/del'
import { get } from './api/get'
import { image } from './api/image'
import { AppError, ErrorCode } from './utils/app-error'

const app = new Hono<Env>()

app.get('/api/get', get)
app.post('/api/add', add)
app.delete('/api/del', del)
app.get('/api/image/:key', image)

app.get('*', async (ctx) => {
  return ctx.env.ASSETS.fetch(ctx.req)
})

app.onError((err, ctx) => {
  if (err instanceof AppError) {
    console.error(err.toString())
    return ctx.json({ error: err.toJson() }, err.statusCode)
  }
  return ctx.json(
    { error: { code: ErrorCode.UNKNOWN, message: err.message } },
    500
  )
})

export default app
