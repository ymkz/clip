import { hc } from 'hono/client'
import { ClipServerRoutes } from '../../server'
import { ClipRemoveInput } from '../../server/schemas/clip'

const client = hc<ClipServerRoutes>('/api')

export const getClipList = async () => {
  const response = await client.list.$get().catch((err) => {
    throw new Error('ネットワークエラー', { cause: err })
  })

  if (!response.ok) {
    const errText = await response.text().catch((err) => {
      throw new Error('予期しないエラーがレスポンスされました', { cause: err })
    })
    throw new Error(errText)
  }

  const json = await response.json().catch((err) => {
    throw new Error('JSONのパースに失敗しました', { cause: err })
  })

  return json
}

export const deleteClip = async (input: ClipRemoveInput) => {
  const response = await client.remove
    .$delete({ json: { id: input.id } })
    .catch((err) => {
      throw new Error('ネットワークエラー', { cause: err })
    })

  if (!response.ok) {
    const errText = await response.text().catch((err) => {
      throw new Error('予期しないエラーがレスポンスされました', { cause: err })
    })
    throw new Error(errText)
  }

  const json = await response.json().catch((err) => {
    throw new Error('JSONのパースに失敗しました', { cause: err })
  })

  return json
}
