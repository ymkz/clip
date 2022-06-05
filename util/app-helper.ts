export function validateHttpUrl(maybeUrl?: string) {
  if (!maybeUrl) {
    return undefined
  }

  try {
    const url = new URL(maybeUrl)
    return url.protocol.startsWith('http') ? maybeUrl : undefined
  } catch (e) {
    return undefined
  }
}
