import parse, { HTMLElement } from "node-html-parser"
import { Page } from "~/types/page"

/**
 * HTMLRewriterで実装をリプレースしたい
 * @see https://developers.cloudflare.com/workers/runtime-apis/html-rewriter
 */
export async function fetchPage(url: string): Promise<Page> {
  const UA =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
  const id = Date.now().toString()
  const response = await fetch(url, { headers: { "user-agent": UA } })
  const text = await response.text()
  const html = parse(text)
  const title = getTitle(html) ?? url
  const description = getDescription(html)
  const imageUrl = getImageUrl(html)

  return { id, url, title, description, imageUrl }
}

function getTitle(html: HTMLElement): string | undefined {
  return (
    html.querySelector("title")?.text.trim() ??
    html
      .querySelector('meta[property="og:title"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[name="twitter:title"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[property="twitter:title"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "")
  )
}

function getDescription(html: HTMLElement): string | undefined {
  return (
    html
      .querySelector('meta[name="description"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[property="og:description"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[name="twitter:description"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[property="twitter:description"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[itemprop="description"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "")
  )
}

function getImageUrl(html: HTMLElement): string | undefined {
  return (
    html
      .querySelector('meta[property="og:image:secure_url"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[property="og:image:url"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[property="og:image"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[name="twitter:image:src"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[property="twitter:image:src"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[name="twitter:image"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[property="twitter:image"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "") ??
    html
      .querySelector('meta[itemprop="image"]')
      ?.getAttribute("content")
      ?.trim()
      .replace(/\r?\n/g, "")
  )
}
