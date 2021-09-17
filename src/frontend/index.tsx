import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { IndexPage } from '~/frontend/pages'

const queryClient = new QueryClient()

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <IndexPage />
      </QueryClientProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
