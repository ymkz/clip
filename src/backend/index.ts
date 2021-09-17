import { Router } from 'itty-router'
import { add } from '~/backend/api/add'
import { del } from '~/backend/api/del'
import { get } from '~/backend/api/get'
import { index } from '~/backend/api/index'
import { rejectWorkersDev } from '~/backend/helper/validation'

const router = Router()

router.get('/api/get', rejectWorkersDev, get)
router.post('/api/add', rejectWorkersDev, add)
router.delete('/api/del', rejectWorkersDev, del)
router.get('*', rejectWorkersDev, index)

addEventListener('fetch', (event) => {
  event.respondWith(router.handle(event.request, event))
})
