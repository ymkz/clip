import { StrictMode } from 'react'
import { render } from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Item } from '~/frontend/components/item'
import { usePageGet } from '~/frontend/hooks/use-page'

const queryClient = new QueryClient()

const IndexPage = (): JSX.Element => {
  const { data: pageList } = usePageGet()
  return (
    <ul className="list">
      {pageList?.map((page) => (
        <Item key={page.id} page={page} />
      ))}
    </ul>
  )
}

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
