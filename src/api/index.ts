import { Request, Router } from 'itty-router'
import { index } from '~/api/controller'
import { add } from '~/api/controller/add'
import { get } from '~/api/controller/get'
import { remove } from '~/api/controller/remove'
import { notFound } from '~/api/helper/response'

const router = Router()

const notFoundOnWorkersDev = (req: Request) => {
  if (req.url.includes('workers.dev')) {
    return notFound()
  }
}

router.get('/api/get', notFoundOnWorkersDev, get)
router.post('/api/add', notFoundOnWorkersDev, add)
router.delete('/api/remove', notFoundOnWorkersDev, remove)
router.get('*', notFoundOnWorkersDev, index)

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request, event))
})
