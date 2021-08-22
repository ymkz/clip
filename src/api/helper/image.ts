import { encode, toHEX } from '~/api/helper/_internal'
import { PageData } from '~/types/page-data'

export async function uploadImage(pageData: PageData): Promise<string> {
  const endpoint = 'https://api.cloudinary.com/v1_1/ymkz/image/upload'
  const params = `?upload_preset=readlater&public_id=${pageData.id}&file=${pageData.imageUrl}`
  const response = await fetch(`${endpoint}${params}`, { method: 'POST' })
  const { secure_url } = await response.json()
  return secure_url
}

export async function removeImage(id: PageData['id']): Promise<void> {
  const endpoint = 'https://api.cloudinary.com/v1_1/ymkz/image/destroy'
  const timestamp = Date.now().toString()
  const base = `invalidate=true&public_id=readlater/${id}&timestamp=${timestamp}`
  const msg = `${base}${CLOUDINARY_API_SECRET}`
  const signature = await crypto.subtle.digest('SHA-1', encode(msg)).then(toHEX)
  const params = `?${base}&signature=${signature}&api_key=${CLOUDINARY_API_KEY}`
  await fetch(`${endpoint}${params}`, { method: 'POST' })
}
