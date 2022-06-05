export async function fetchClipImage(
  imageUrl?: string
): Promise<FetchedClipImage> {
  if (!imageUrl) {
    return {
      image: undefined,
      contentType: undefined,
    }
  }

  try {
    const response = await fetch(imageUrl)
    const image = await response.arrayBuffer()
    return {
      image,
      contentType:
        response.headers.get('Content-Type') ?? 'application/octet-stream',
    }
  } catch (e) {
    return {
      image: undefined,
      contentType: undefined,
    }
  }
}
