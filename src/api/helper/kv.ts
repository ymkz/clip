import { PageData } from '~/types/page-data'

export const getAll = async (): Promise<PageData[]> => {
  const data = (await DB.get('data')) ?? '[]'
  return JSON.parse(data)
}

export const addOne = async (data: PageData): Promise<void> => {
  const prev = await getAll()
  const next = [...prev, data]
  await DB.put('data', JSON.stringify(next))
}

export const removeOne = async (id: PageData['id']): Promise<void> => {
  const prev = await getAll()
  const next = prev.filter((item) => item.id !== id)
  await DB.put('data', JSON.stringify(next))
}

export const updateOneOfImageUrl = async (
  id: PageData['id'],
  imageUrl: PageData['imageUrl']
): Promise<void> => {
  const prev = await getAll()
  const next = prev.map((item) =>
    item.id === id ? { ...item, imageUrl } : item
  )
  await DB.put('data', JSON.stringify(next))
}
