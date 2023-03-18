export type ClipBatchBindings = {
  KV_CLIP: KVNamespace<'user-agent'>
}

export type ChromiumRelease = {
  channel: 'Stable'
  chromium_main_branch_position: number
  hashes: {
    angle: string
    chromium: string
    dawn: string
    devtools: string
    pdfium: string
    skia: string
    v8: string
    webrtc: string
  }
  milestone: number
  platform: string
  previous_version: string
  time: number
  version: string
}
