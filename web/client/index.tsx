import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClipList } from './components/clip-list'
import './styles/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ClipList />
      </QueryClientProvider>
    </StrictMode>
  )
}

createRoot(document.querySelector('#root') as HTMLElement).render(<App />)
