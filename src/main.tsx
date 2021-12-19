import { StrictMode } from "react"
import { render } from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { Item } from "~/components/item"
import { usePageGet } from "~/hooks/use-page"
import "~/style.css"

const queryClient = new QueryClient()

const App = () => {
  const { data: pageList } = usePageGet()
  return (
    <ul className="list">
      {pageList?.map((page) => (
        <Item key={page.id} page={page} />
      ))}
    </ul>
  )
}

render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
  document.querySelector("#root")
)
