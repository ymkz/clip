/// <reference types="@cloudflare/workers-types" />

import 'hono'

declare module 'hono' {
  interface Hono {
    onError(err: AppErrorType, ctx: Context): Response
  }
}
