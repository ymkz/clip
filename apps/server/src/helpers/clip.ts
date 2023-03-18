import { ClipImage, ClipInfo } from '@clip/common'

export async function getClipInfo(url: string): Promise<ClipInfo> {
  const id = Date.now().toString()

  const response = await fetchClipInfo(url)

  let info: { [key: string]: string } = {}

  await new HTMLRewriter()
    .on('head > title', {
      text(text) {
        if (text.text) {
          info['title'] = text.text
        }
      },
    })
    .on('meta', {
      element(element) {
        const name = element.getAttribute('name')
        const property = element.getAttribute('property')
        const content = element.getAttribute('content')
        const key = name || property
        if (key && content) {
          info[key] = content
        }
      },
    })
    .transform(response.clone())
    .text()
    .catch((err) => {
      throw new Error(`clip info cannot parse: ${url}`, { cause: err })
    })

  const title =
    info['title'] || info['og:title'] || info['twitter:title'] || url
  const description =
    info['description'] ||
    info['og:description'] ||
    info['twitter:description'] ||
    undefined
  const imageUrl =
    info['og:image'] ||
    info['og:image:url'] ||
    info['og:image:secure_url'] ||
    info['twitter:image'] ||
    info['twitter:image:src'] ||
    undefined

  const result = {
    id,
    url,
    title,
    description,
  }

  if (!imageUrl) {
    return result
  }

  if (!isValidHttpUrl(imageUrl)) {
    console.error(`imageUrl is not valid as http url: ${imageUrl}`)
    return result
  }

  try {
    const image = await fetchClipImage(imageUrl)
    return { ...result, image }
  } catch (err) {
    // clipImageの取得で例外が発生した場合もimageはundefinedとして処理を継続させる
    console.error(err)
    return result
  }
}

/**
 *
 * @see https://snyk.io/blog/secure-javascript-url-validation/
 *
 * URLとしてパース可能かつhttpアクセス可能であるかどうかを判定する
 *
 */
const isValidHttpUrl = (maybeUrl: string): boolean => {
  try {
    // 相対パスでogImageを記述されている場合などで例外が発生する
    return new URL(maybeUrl).protocol.startsWith('http')
  } catch (err) {
    return false
  }
}

const fetchClipInfo = async (url: string): Promise<Response> => {
  // TODO: 固定値ではなく最新のUAに追従すべき、ブラウザのUAの廃止に伴い、リクエストが異常になる可能性がある
  const UA =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'

  const response = await fetch(url, { headers: { 'user-agent': UA } }).catch(
    (err) => {
      throw new Error(`client error when fetch clip info: ${url}`, {
        cause: err,
      })
    }
  )

  if (!response.ok) {
    throw new Error(`bad response from server when fetch clip info: ${url}`)
  }

  return response
}

const fetchClipImage = async (url: string): Promise<ClipImage> => {
  const response = await fetch(url).catch((err) => {
    throw new Error(`client error when fetch clip image: ${url}`, {
      cause: err,
    })
  })

  if (!response.ok) {
    throw new Error(`bad response from server when fetch clip image: ${url}`)
  }

  const arrayBuffer = await response.arrayBuffer().catch((err) => {
    throw new Error(`clip image cannot parse as ArrayBuffer: ${url}`, {
      cause: err,
    })
  })

  const contentType =
    response.headers.get('Content-Type') ?? 'application/octet-stream'

  return {
    src: arrayBuffer,
    contentType: contentType,
  }
}
