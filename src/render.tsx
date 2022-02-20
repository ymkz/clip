import { Outlet, ReactLocation, Route, Router } from '@tanstack/react-location'
import React from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import 'regenerator-runtime/runtime'
import { ClipList } from '~/view/clip-list'

const queryClient = new QueryClient()
const location = new ReactLocation()
const routes: Route[] = [
  {
    path: '/',
    element: <ClipList />,
    // loader: () => ({
    //   clips:
    //     queryClient.getQueryData('/api/get') ??
    //     queryClient.fetchQuery('/api/get', fetchClips),
    // }),
  },
]

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router location={location} routes={routes}>
        <Outlet />
      </Router>
    </QueryClientProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
