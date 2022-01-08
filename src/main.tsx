import { StrictMode } from "react"
import { render } from "react-dom"
import { SWRConfig } from "swr"
import { Item } from "~/components/item"
import { usePageGet } from "~/hooks/use-page"
import "~/style.css"

const App = () => {
  const { pageList } = usePageGet()

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
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        fetcher: (req) => fetch(req).then((res) => res.json()),
      }}
    >
      <App />
    </SWRConfig>
  </StrictMode>,
  document.querySelector("#root")
)
