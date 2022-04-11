import React from 'react'
import { createRoot } from 'react-dom/client'
import { SWRConfig } from 'swr'
import { ClipList } from '~/view/clip-list'

function App() {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        fetcher: (req) => fetch(req).then((res) => res.json()),
      }}
    >
      <ClipList />
    </SWRConfig>
  )
}

const container = document.querySelector('#root')

if (container) {
  createRoot(container).render(<App />)
}
