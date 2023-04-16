const notifySuccess = (message: string): void => {
  return chrome.notifications.create({
    type: 'basic',
    title: 'Clip Success',
    iconUrl: 'assets/icon_x128.png',
    message,
  })
}

const notifyFailure = (message: string): void => {
  return chrome.notifications.create({
    type: 'basic',
    title: 'Clip Failure',
    iconUrl: 'assets/icon_x128.png',
    message,
  })
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.url) {
    console.error('[CHROME ERROR]: tab url not found')
    return notifyFailure('[CHROME ERROR]: tab url not found')
  }

  try {
    const response = await fetch(TARGET_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({ url: tab.url }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error(
        `[SERVER ERROR]: ${response.status} : ${JSON.stringify(error)}`
      )
      return notifyFailure(
        `[SERVER ERROR]: ${response.status} : ${JSON.stringify(error)}`
      )
    }

    return notifySuccess(tab.url)
  } catch (error) {
    console.error(`[CLIENT ERROR]: ${JSON.stringify(error)}`)
    return notifyFailure(`[CLIENT ERROR]: ${JSON.stringify(error)}`)
  }
})
