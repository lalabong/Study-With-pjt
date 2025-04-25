'use client';

import {
  QueryClient,
  HydrationBoundary as RQHydrationBoundary,
  DehydratedState,
} from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export const getQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
    },
  });

export const HydrationBoundary = ({
  children,
  state,
}: {
  children: ReactNode;
  state: DehydratedState;
}) => {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <RQHydrationBoundary state={state} queryClient={queryClient}>
      {children}
    </RQHydrationBoundary>
  );
};
