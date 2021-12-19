import { encode, toHEX } from "~/helpers/util"
import { Page } from "~/types/page"

export async function uploadImage(page: Page): Promise<string> {
  const endpoint = "https://api.cloudinary.com/v1_1/ymkz/image/upload"
  const preset = "clip-image"
  const params = `?upload_preset=${preset}&public_id=${page.id}&file=${page.imageUrl}`
  const response = await fetch(`${endpoint}${params}`, { method: "POST" })
  const { secure_url } = await response.json()
  return secure_url
}

export async function removeImage(
  id: Page["id"],
  key: string,
  secret: string
): Promise<void> {
  const endpoint = "https://api.cloudinary.com/v1_1/ymkz/image/destroy"
  const timestamp = Date.now().toString()
  const base = `invalidate=true&public_id=clip/${id}&timestamp=${timestamp}`
  const msg = `${base}${secret}`
  const signature = await crypto.subtle.digest("SHA-1", encode(msg)).then(toHEX)
  const params = `?${base}&signature=${signature}&api_key=${key}`
  await fetch(`${endpoint}${params}`, { method: "POST" })
}
