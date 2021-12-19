import { Page } from "~/types/page"

export const getAll = async (kv: KVNamespace): Promise<Page[]> => {
  const data = await kv.get<Page[]>("data", "json")
  return data ?? []
}

export const addOne = async (kv: KVNamespace, data: Page): Promise<void> => {
  const prev = await getAll(kv)
  const next = [data, ...prev]
  await kv.put("data", JSON.stringify(next))
}

export const removeOne = async (
  kv: KVNamespace,
  id: Page["id"]
): Promise<void> => {
  const prev = await getAll(kv)
  const next = prev.filter((item) => item.id !== id)
  await kv.put("data", JSON.stringify(next))
}

export const updateOneOfImageUrl = async (
  kv: KVNamespace,
  id: Page["id"],
  imageUrl: Page["imageUrl"]
): Promise<void> => {
  const prev = await getAll(kv)
  const next = prev.map((item) =>
    item.id === id ? { ...item, imageUrl } : item
  )
  await kv.put("data", JSON.stringify(next))
}
