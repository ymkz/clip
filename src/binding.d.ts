declare const DB: KVNamespace
declare const ENVIRONMENT: 'local' | 'production'
declare const CLOUDINARY_API_KEY: string
declare const CLOUDINARY_API_SECRET: string

type AppErrorType = {
  reason: string
  status: number
}

type ClipItem = {
  id: string
  url: string
  title: string
  description?: string
  imageUrl?: string
}
