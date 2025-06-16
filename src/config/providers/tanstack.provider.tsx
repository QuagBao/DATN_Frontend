'use client'

import { type PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600000,
      retry: 1,
      retryDelay: 5000
    }
  }
})

const TanStackProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition='top-left' /> */}
      {children}
    </QueryClientProvider>
  )
}

export default TanStackProvider
