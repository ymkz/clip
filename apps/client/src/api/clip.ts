import { ClipRemoveInput } from '@clip/common'
import { ClipServerRoutes } from '@clip/server'
import { hc } from 'hono/client'

const client = hc<ClipServerRoutes>('/api')

export const getClipList = async () => {
  const response = await client.list.$get().catch((err) => {
    throw new Error('[api.list] network error', { cause: err })
  })

  if (!response.ok) {
    throw new Error('[api.list] response not ok')
  }

  const json = await response.json().catch((err) => {
    throw new Error('[api.list] invalid json response', { cause: err })
  })

  return json
}

export const deleteClip = async (input: ClipRemoveInput) => {
  const response = await client.remove
    .$delete({ json: { id: input.id } })
    .catch((err) => {
      throw new Error('[api.remove] network error', { cause: err })
    })

  if (!response.ok) {
    throw new Error('[api.remove] response not ok')
  }

  const json = await response.json().catch((err) => {
    throw new Error('[api.remove] invalid json response', { cause: err })
  })

  return json
}
