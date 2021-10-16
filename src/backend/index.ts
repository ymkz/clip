import { Router } from 'itty-router'
import { add } from '~/backend/api/add'
import { del } from '~/backend/api/del'
import { get } from '~/backend/api/get'
import { render } from '~/backend/api/render'

const router = Router()

router.get('/api/get', get)
router.post('/api/add', add)
router.delete('/api/del', del)
router.get('*', render)

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request, event))
})
