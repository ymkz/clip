import { Clip, ClipImage, ClipImageMetaData } from '../schemas/clip'

export const getClipData = async (kv: KVNamespace): Promise<Clip[]> => {
  const data = await kv.get<Clip[]>('clip-data', 'json')
  return data ?? []
}

export const addClipItem = async (
  kv: KVNamespace,
  data: Clip
): Promise<void> => {
  const prev = await getClipData(kv)
  const next = [data, ...prev]
  await kv.put('clip-data', JSON.stringify(next))
}

export const deleteClipItem = async (
  kv: KVNamespace,
  id: Clip['id']
): Promise<void> => {
  const prev = await getClipData(kv)
  const next = prev.filter((item) => item.id !== id)
  await kv.put('clip-data', JSON.stringify(next))
}

export const getClipImage = async (
  kv: KVNamespace,
  key: Clip['id']
): Promise<ClipImage> => {
  const image = await kv.getWithMetadata<ClipImageMetaData>(key, 'arrayBuffer')

  if (!image.value || !image.metadata) {
    throw new Error('not found clip image')
  }

  return {
    src: image.value,
    contentType: image.metadata.contentType,
  }
}

export const addClipImage = async (
  kv: KVNamespace,
  key: Clip['id'],
  image: ClipImage
): Promise<void> => {
  await kv.put(key, image.src, {
    metadata: { contentType: image.contentType },
  })
}

export const deleteClipImage = async (
  kv: KVNamespace,
  key: Clip['id']
): Promise<void> => {
  await kv.delete(key)
}
