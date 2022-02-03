import React from "react"
import ReactDOM from "react-dom"
import { SWRConfig } from "swr"
import { useClipGet } from "~/view/hooks"
import { Item } from "~/view/item"

const App = () => {
  const { clips } = useClipGet()

  return (
    <ul className="clip-list">
      {clips?.map((clip) => (
        <Item key={clip.id} clip={clip} />
      ))}
    </ul>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        fetcher: (req) => fetch(req).then((res) => res.json()),
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>,
  document.querySelector("#root")
)
