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

app.notFound = (ctx) => {
  return ctx.json({ error: { reason: 'not found' } }, 404)
}

app.onError = (err = { reason: 'unexpected error', status: 500 }, ctx) => {
  if (err instanceof Error) {
    return ctx.json({ error: { reason: 'unknown error' } }, 500)
  } else {
    return ctx.json({ error: { reason: err.reason } }, err.status)
  }
}

app.fire()
