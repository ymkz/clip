import { createEventHandler } from "@remix-run/cloudflare-workers"
// @ts-ignore
import * as build from "../build"

addEventListener("fetch", createEventHandler({ build }))
