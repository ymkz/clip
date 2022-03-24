import { Hono } from 'hono'
import { serveStatic } from 'hono/serve-static'
import { addClip } from '~/api/add'
import { removeClip } from '~/api/del'
import { getClips } from '~/api/get'

const app = new Hono()

app.use('*', serveStatic())

app.get('/api/get', getClips)
app.post('/api/add', addClip)
app.delete('/api/del', removeClip)

app.onError((err = Error('unexpected error'), ctx) => {
  console.error(JSON.stringify({ err: { reason: err.message } }))
  return ctx.json({ err: { reason: err.message } }, 500)
})

app.fire()
