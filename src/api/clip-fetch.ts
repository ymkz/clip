export async function fetchClipItem(url: string): Promise<ClipItem> {
  const UA =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36'
  const id = Date.now().toString()
  const response = await fetch(url, { headers: { 'user-agent': UA } })
  const info: { [key: string]: string } = {}
  await new HTMLRewriter()
    .on('title', {
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
  return {
    id,
    url,
    title: info['title'] || info['og:title'] || info['twitter:title'],
    description:
      info['description'] ||
      info['og:description'] ||
      info['twitter:description'],
    imageUrl:
      info['og:image'] ||
      info['og:image:url'] ||
      info['og:image:secure_url'] ||
      info['twitter:image'] ||
      info['twitter:image:src'],
  }
}
