type Env = {
  KV_CLIP_DATA: KVNamespace
}

type MetaData = {
  contentType: string
}

type ClipItem = {
  id: string
  url: string
  title: string
  description?: string
  hasImage: boolean
}

type FetchedClipInfo = {
  title: string
  description?: string
  imageUrl?: string
}

type FetchedClipImage = {
  image?: ArrayBuffer
  contentType?: string
}
