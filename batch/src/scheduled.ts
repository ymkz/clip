import { ChromiumRelease, ClipBatchBindings } from './types'

export const scheduled = async (env: ClipBatchBindings) => {
  const url =
    'https://chromiumdash.appspot.com/fetch_releases?channel=Stable&platform=Windows&num=1'

  const response = await fetch(url).catch((err) => {
    console.error({ reason: 'failed to fetch', url })
    throw new Error(`failed to fetch from chromium release`, { cause: err })
  })

  if (!response.ok) {
    console.error({ reason: 'bad response', url, status: response.status })
    throw new Error(`bad response ${response.status} from chromium release`)
  }

  const [latest] = await response.json<ChromiumRelease[]>().catch((err) => {
    console.error({ reason: 'failed to parse response json', url })
    throw new Error(`failed to parse response json from chromium release`, {
      cause: err,
    })
  })

  const ua = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${latest.version} Safari/537.36`

  await env.KV_CLIP.put('user-agent', ua, { metadata: latest }).catch((err) => {
    throw new Error('failed to put KV_CLIP::user-agent', { cause: err })
  })

  console.log(`succeeded scheduled update user-agent: ${ua}`)
}
