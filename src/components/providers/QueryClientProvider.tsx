'use client';

import { QueryClientProvider as Provider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useEffect, useState } from 'react';

import { isDevelopmentEnv } from '@/constants/env';
import { useSessionStore } from '@/stores';

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 30 * 1000,
        retry: false,
      },
    },
  });

interface QueryClientProviderProps {
  children: ReactNode;
}

const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  // One client per browser session; `useState` keeps it stable across re-renders and avoids sharing between SSR requests.
  const [queryClient] = useState(makeQueryClient);

  // Drop every cached response when the identity changes (login / logout / token swap).
  useEffect(
    () =>
      useSessionStore.subscribe((session, previous) => {
        if (session.sessionRevision !== previous.sessionRevision) queryClient.clear();
      }),
    [queryClient]
  );

  return (
    <Provider client={queryClient}>
      {children}
      {isDevelopmentEnv ? <ReactQueryDevtools buttonPosition='bottom-left' initialIsOpen={false} /> : null}
    </Provider>
  );
};

export default QueryClientProvider;
