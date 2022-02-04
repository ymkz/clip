/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare-workers/globals" />
/// <reference types="@cloudflare/workers-types" />

declare const DB: KVNamespace
declare const ENVIRONMENT: "local" | "production"
declare const CLOUDINARY_API_KEY: string
declare const CLOUDINARY_API_SECRET: string

type ClipItem = {
  id: string
  url: string
  title: string
  description?: string
  imageUrl?: string
}
