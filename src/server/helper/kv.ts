import { ClipImage, ClipImageMetaData, ClipSchema } from '../../schema/clip'
import { createKVError } from './error'

export const getClipData = async (kv: KVNamespace): Promise<ClipSchema[]> => {
  const data = await kv.get<ClipSchema[]>('clip-data', 'json').catch((err) => {
    throw createKVError({ reason: 'failed to get clip data', cause: err })
  })
  return data ?? []
}

export const addClipItem = async (
  kv: KVNamespace,
  data: ClipSchema
): Promise<void> => {
  const prev = await getClipData(kv)
  const next = [data, ...prev]
  await kv.put('clip-data', JSON.stringify(next)).catch((err) => {
    throw createKVError({ reason: 'failed to add clip item', cause: err })
  })
}

export const deleteClipItem = async (
  kv: KVNamespace,
  id: ClipSchema['id']
): Promise<void> => {
  const prev = await getClipData(kv)
  const next = prev.filter((item) => item.id !== id)
  await kv.put('clip-data', JSON.stringify(next)).catch((err) => {
    throw createKVError({ reason: 'failed to delete clip item', cause: err })
  })
}

export const getClipImage = async (
  kv: KVNamespace,
  key: ClipSchema['id']
): Promise<ClipImage> => {
  const image = await kv
    .getWithMetadata<ClipImageMetaData>(key, 'arrayBuffer')
    .catch((err) => {
      throw createKVError({ reason: 'failed to get clip image', cause: err })
    })

  if (!image.value || !image.metadata) {
    throw createKVError({ reason: 'not found clip image' })
  }

  return {
    src: image.value,
    contentType: image.metadata.contentType,
  }
}

export const addClipImage = async (
  kv: KVNamespace,
  key: ClipSchema['id'],
  image: ClipImage
): Promise<void> => {
  await kv
    .put(key, image.src, {
      metadata: { contentType: image.contentType },
    })
    .catch((err) => {
      throw createKVError({ reason: 'failed to add clip image', cause: err })
    })
}

export const deleteClipImage = async (
  kv: KVNamespace,
  key: ClipSchema['id']
): Promise<void> => {
  await kv.delete(key).catch((err) => {
    throw createKVError({ reason: 'failed to delete clip image', cause: err })
  })
}
