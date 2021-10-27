import { Router } from 'itty-router'
import { errorHandler } from '~/backend/helper/error'
import { add } from '~/backend/router/add'
import { del } from '~/backend/router/del'
import { get } from '~/backend/router/get'
import { render } from '~/backend/router/render'

const api = Router({ base: '/api' })
const router = Router()

api.get('/get', get).post('/add', add).delete('/del', del)

router
  .all('/api/*', api.handle)
  .get('*', render)
  .all('*', () => new Response('Not Found', { status: 404 }))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
addEventListener('fetch', (event: any) => {
  event.respondWith(router.handle(event.request, event).catch(errorHandler))
})
