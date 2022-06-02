export async function fetchClipInfo(url: string): Promise<FetchedClipInfo> {
  const UA =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36'
  const response = await fetch(url, { headers: { 'user-agent': UA } })
  const info: { [key: string]: string } = {}

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

  return {
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
