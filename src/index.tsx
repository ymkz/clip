import { StrictMode } from 'react'
import { render } from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { IndexPage } from '~/pages/index'
import './styles/global.css'

const queryClient = new QueryClient()

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <IndexPage />
      </QueryClientProvider>
    </StrictMode>
  )
}

render(<App />, document.querySelector('#root'))
