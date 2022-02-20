import React from 'react'
import ReactDOM from 'react-dom'
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

ReactDOM.render(<App />, document.querySelector('#root'))
