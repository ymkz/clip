import { E } from './error'

export const getClipData = async (kv: KVNamespace): Promise<ClipItem[]> => {
  try {
    const data = await kv.get<ClipItem[]>('clip-data', 'json')
    return data ?? []
  } catch {
    throw E.KvGetClipDataFailure
  }
}

export const addClipItem = async (
  kv: KVNamespace,
  data: ClipItem
): Promise<void> => {
  try {
    const prev = await getClipData(kv)
    const next = [data, ...prev]
    await kv.put('clip-data', JSON.stringify(next))
  } catch {
    throw E.KvAddClipItemFailure
  }
}

export const deleteClipItem = async (
  kv: KVNamespace,
  id: ClipItem['id']
): Promise<void> => {
  try {
    const prev = await getClipData(kv)
    const next = prev.filter((item) => item.id !== id)
    await kv.put('clip-data', JSON.stringify(next))
  } catch {
    throw E.KvDeleteClipItemFailure
  }
}

export const getClipImage = async (
  kv: KVNamespace,
  key: ClipItem['id']
): Promise<KVNamespaceGetWithMetadataResult<ArrayBuffer, MetaData>> => {
  try {
    const image = await kv.getWithMetadata<MetaData>(key, 'arrayBuffer')
    return image
  } catch {
    throw E.KvGetClipImageFailure
  }
}

export const addClipImage = async (
  kv: KVNamespace,
  key: ClipItem['id'],
  image: ClipImage
): Promise<void> => {
  try {
    await kv.put(key, image.src, {
      metadata: {
        contentType: image.contentType,
      },
    })
  } catch {
    throw E.KvAddClipImageFailure
  }
}

export const deleteClipImage = async (
  kv: KVNamespace,
  key: ClipItem['id']
): Promise<void> => {
  try {
    await kv.delete(key)
  } catch {
    throw E.KvDeleteClipImageFailure
  }
}
