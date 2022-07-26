type Env = {
  KV_CLIP_DATA: KVNamespace
}

type ApiAddRequestBody = {
  url?: string
}

type ApiDelRequestBody = {
  id?: string
}

type MetaData = {
  contentType: string
}

type ClipItem = {
  id: string
  url: string
  title: string
  hasImage: boolean
  description?: string
}

type ClipImage = {
  src: ArrayBuffer
  contentType: string
}

type ClipInfo = {
  id: string
  url: string
  title: string
  description?: string
  image?: ClipImage
}
