export const getClipData = async (kv: KVNamespace): Promise<ClipItem[]> => {
  const data = await kv.get<ClipItem[]>('clip-data', 'json')
  return data ?? []
}

export const addClipItem = async (
  kv: KVNamespace,
  data: ClipItem
): Promise<void> => {
  const prev = await getClipData(kv)
  const next = [data, ...prev]
  await kv.put('clip-data', JSON.stringify(next))
}

export const deleteClipItem = async (
  kv: KVNamespace,
  id: ClipItem['id']
): Promise<void> => {
  const prev = await getClipData(kv)
  const next = prev.filter((item) => item.id !== id)
  await kv.put('clip-data', JSON.stringify(next))
}

export const getClipImage = async (
  kv: KVNamespace,
  key: ClipItem['id']
): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, MetaData>> => {
  const image = await kv.getWithMetadata<MetaData>(key, 'arrayBuffer')
  return image
}

export const addClipImage = async (
  kv: KVNamespace,
  key: ClipItem['id'],
  image: ArrayBuffer,
  contentType: string
): Promise<void> => {
  await kv.put(key, image, {
    metadata: {
      contentType,
    },
  })
}

export const deleteClipImage = async (
  kv: KVNamespace,
  key: ClipItem['id']
): Promise<void> => {
  await kv.delete(key)
}
