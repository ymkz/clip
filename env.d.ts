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

// import "hono"

// declare module "hono" {
//   interface Env {
//     DB: KVNamespace
//   }
// }
