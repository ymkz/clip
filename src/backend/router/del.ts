import { Request } from 'itty-router'
import { ErrorCode } from '~/backend/helper/error'
import { removeImage } from '~/backend/helper/image'
import { removeOne } from '~/backend/helper/kv'

type Body = {
  id: string
}

export const del = async (
  req: Request,
  event: FetchEvent
): Promise<Response> => {
  const body: Body = await req.json?.().catch(() => {
    throw ErrorCode.REQUEST_BODY_MISSING_ERROR
  })

  await removeOne(body.id).catch(() => {
    throw ErrorCode.KV_REMOVE_ONE_ERROR
  })

  if (ENVIRONMENT === 'production') {
    const task = async () => {
      await removeImage(body.id)
    }
    event.waitUntil(task())
  }

  return new Response('OK')
}
