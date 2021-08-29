import { Request, Router } from 'itty-router'
import { index } from '~/api/controller'
import { add } from '~/api/controller/add'
import { del } from '~/api/controller/del'
import { get } from '~/api/controller/get'
import { notFound } from '~/api/helper/response'

const router = Router()

const notFoundOnWorkersDev = (req: Request) => {
  if (req.url.includes('workers.dev')) {
    return notFound()
  }
}

router.get('/api/get', notFoundOnWorkersDev, get)
router.post('/api/add', notFoundOnWorkersDev, add)
router.delete('/api/del', notFoundOnWorkersDev, del)
router.get('*', notFoundOnWorkersDev, index)

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request, event))
})
