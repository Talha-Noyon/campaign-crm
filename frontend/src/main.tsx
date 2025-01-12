import {QueryClientProvider} from '@tanstack/react-query'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import {ConnectionStatus} from '@/components/ConnectionStatus'
import {ErrorBoundary, ErrorFallback} from '@/components/ErrorBoundary'
import {AppRoutes} from '@/routing/AppRoutes'

import '@/styles/main.scss'
import {queryClient} from '@/utils/QueryClient'

const {BASE_URL} = import.meta.env

const container = document.getElementById('root')

if (container) {
  createRoot(container).render(
    <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={BASE_URL}>
          <AppRoutes />
        </BrowserRouter>
        <ConnectionStatus />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
