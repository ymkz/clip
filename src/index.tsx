import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SWRConfig } from 'swr'
import { ClipList } from './components/clip-list'
import './index.css'

const container = document.querySelector('#root')

if (container) {
  createRoot(container).render(
    <StrictMode>
      <SWRConfig
        value={{
          shouldRetryOnError: false,
          fetcher: async (req: string | Request) => {
            return fetch(req).then((res) => res.json())
          },
        }}
      >
        <ClipList />
      </SWRConfig>
    </StrictMode>
  )
}
