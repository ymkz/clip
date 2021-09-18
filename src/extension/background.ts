const endpoint = 'https://clip.ymkz.app/api/add'

const notifySuccess = (message: string) => {
  return chrome.notifications.create({
    type: 'basic',
    title: 'Clip Success',
    message,
    iconUrl: './assets/icon_x128.png',
  })
}

const notifyFailure = (message: string) => {
  return chrome.notifications.create({
    type: 'basic',
    title: 'Clip Failure',
    message,
    iconUrl: './assets/icon_x128.png',
  })
}

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ url: tab.url }),
      })

      if (!response.ok) {
        return notifyFailure(`Server Error: ${response.statusText}`)
      }

      notifySuccess(tab.url)
    } catch (error) {
      notifyFailure(`Client Error: ${error}`)
    }
  } else {
    console.error('E_NOT_FOUND_TAB_URL')
  }
})
