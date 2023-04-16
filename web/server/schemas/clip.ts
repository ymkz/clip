import { z } from 'zod'

export const clipSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  title: z.string(),
  description: z.string().optional(),
  hasImage: z.boolean().optional(),
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

export const clipImageSchema = z.object({
  src: z.custom<ArrayBuffer>(),
  contentType: z.string(),
})
export type ClipImage = z.infer<typeof clipImageSchema>

export const clipImageMetaSchema = z.object({
  contentType: z.string(),
})
export type ClipImageMetaData = z.infer<typeof clipImageMetaSchema>

export const clipInfoSchema = z.object({
  id: z.string(),
  url: z.string(),
  title: z.string(),
  description: z.string().optional(),
  image: z.custom<ClipImage>().optional(),
})
export type ClipInfo = z.infer<typeof clipInfoSchema>
