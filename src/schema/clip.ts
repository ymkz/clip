import { z } from 'zod'

export const clipSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  title: z.string(),
  description: z.string().nullish(),
  hasImage: z.boolean().nullish(),
})
export type Clip = z.infer<typeof clipSchema>

export const clipAddSchema = z.object({
  url: z.string().url(),
})
export type ClipAddInput = z.infer<typeof clipAddSchema>

export const clipDeleteSchema = z.object({
  id: z.string(),
})
export type ClipRemoveInput = z.infer<typeof clipDeleteSchema>

export type ClipImage = {
  src: ArrayBuffer
  contentType: string
}

export type ClipImageMetaData = {
  contentType: string
}

export type ClipInfo = {
  id: string
  url: string
  title: string
  description?: string
  image?: ClipImage
}
