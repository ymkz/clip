import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { trpc } from '../util/trpc'
import { IndexPage } from './pages'
import './styles/index.css'

const App = () => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: '/trpc' })],
    })
  )
  return (
    <StrictMode>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <IndexPage />
        </QueryClientProvider>
      </trpc.Provider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
