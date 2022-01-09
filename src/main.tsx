import { StrictMode } from "react"
import { render } from "react-dom"
import { SWRConfig } from "swr"
import "virtual:windi.css"
import { Item } from "~/components/item"
import { usePageGet } from "~/helpers/hook"

const App = () => {
  const { pageList } = usePageGet()

  return (
    <ul className="container mx-auto max-w-3xl flex flex-col gap-y-4 p-4">
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
