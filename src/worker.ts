import { createEventHandler } from "@remix-run/cloudflare-workers"
// @ts-ignore
import * as build from "../build"

addEventListener("fetch", (_event) => {
  return createEventHandler({
    build,
    getLoadContext: (event) => {
      return {
        // @ts-ignore
        waitUntil: event.waitUntil,
      }
    },
  })(_event)
})
