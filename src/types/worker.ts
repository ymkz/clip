export type Env = {
  // ASSETS: { fetch: [AsyncFunction: fetch] }
  DB: KVNamespace
  TYPE: "local" | "production"
  CLOUDINARY_API_KEY: string
  CLOUDINARY_API_SECRET: string
}

export type PostBody = {
  url: string
}

export type DeleteBody = {
  id: string
}
