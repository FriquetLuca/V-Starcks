import React, { useState } from 'react'
import { PageContextProvider } from './usePageContext'
import type { PageContext } from './types'
import './App.css'
import { Link } from './Link'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '../utils/trpc';

export function App({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <PageContextProvider pageContext={pageContext}>
            <Link className="navitem" href="/">
              Home
            </Link>
            <Link className="navitem" href="/about">
              About
            </Link>
            <>{children}</>
          </PageContextProvider>
        </React.StrictMode>
      </QueryClientProvider>
    </trpc.Provider>
  )
}
