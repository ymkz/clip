import { Request } from 'itty-router'
import { notFound } from '~/backend/helper/response'

export const rejectWorkersDev = (req: Request): Response | void => {
  if (req.url.includes('workers.dev')) {
    return notFound()
  }
}
