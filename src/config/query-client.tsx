import { createInfiniteQueryService, createQueryService } from '@namphuongtechnologi/react';
import type { QueryClientConfig } from '@tanstack/react-query';
import { keepPreviousData, QueryClient } from '@tanstack/react-query';

const queryClientConfigs: QueryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 60000,
      staleTime: 40000,
      refetchOnMount: false,
      placeholderData: keepPreviousData,
    },
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient(queryClientConfigs);
export const QueryService = createQueryService(queryClient);
export const InfiniteQueryService = createInfiniteQueryService(queryClient);
