import { hc } from 'hono/client'
import { ClipRemoveInput } from '../../schema/clip'
import { ApiType } from '../../server'

const client = hc<ApiType>('')

export const getClipList = async () => {
  const response = await client.api.clip.list.$get().catch((err) => {
    throw new Error('[api.clip.list] network error', { cause: err })
  })

  if (!response.ok) {
    throw new Error('[api.clip.list] response not ok')
  }

  const json = await response.json().catch((err) => {
    throw new Error('[api.clip.list] invalid json response', { cause: err })
  })

  return json
}

export const deleteClip = async (input: ClipRemoveInput) => {
  const response = await client.api.clip.delete
    .$delete({ json: { id: input.id } })
    .catch((err) => {
      throw new Error('[api.clip.create] network error', { cause: err })
    })

  if (!response.ok) {
    throw new Error('[api.clip.create] response not ok')
  }

  const json = await response.json().catch((err) => {
    throw new Error('[api.clip.create] invalid json response', { cause: err })
  })

  return json
}
