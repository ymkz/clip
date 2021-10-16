import { Page } from '~/types/page'

export const getAll = async (): Promise<Page[]> => {
  const data = await DB.get<Page[]>('data', 'json')
  return data ?? []
}

export const addOne = async (data: Page): Promise<void> => {
  const prev = await getAll()
  const next = [data, ...prev]
  await DB.put('data', JSON.stringify(next))
}

export const removeOne = async (id: Page['id']): Promise<void> => {
  const prev = await getAll()
  const next = prev.filter((item) => item.id !== id)
  await DB.put('data', JSON.stringify(next))
}

export const updateOneOfImageUrl = async (
  id: Page['id'],
  imageUrl: Page['imageUrl']
): Promise<void> => {
  const prev = await getAll()
  const next = prev.map((item) =>
    item.id === id ? { ...item, imageUrl } : item
  )
  await DB.put('data', JSON.stringify(next))
}
