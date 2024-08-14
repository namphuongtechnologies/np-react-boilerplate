import {
  createInfiniteQueryService,
  createMutationService,
  createQueryService,
} from '@namphuongtechnologi/react';
import type { QueryClientConfig } from '@tanstack/react-query';
import { keepPreviousData, QueryClient } from '@tanstack/react-query';

import type { User_Permission_Code } from './permission';

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

export const queryClient = new QueryClient(queryClientConfigs);
export const QueryService = createQueryService(queryClient);
export const InfiniteQueryService = createInfiniteQueryService(queryClient, {
  initialPageParam: 1,
  initialPageSize: 50,
  getRecords: (data) => data?.data ?? [],
  getTotalRecords: (data) => data?.totalRecord ?? 0,
});

export const MutationService = createMutationService(queryClient);

declare module '@namphuongtechnologi/react' {
  interface Tanstack_InfiniteQuery_Service<T> extends InfiniteRecord<T> {}

  interface IUser_Permission {
    code: User_Permission_Code;
    c: boolean;
    r: boolean;
    u: boolean;
    d: boolean;
  }
}

type InfiniteRecord<T> = {
  data: T[];
  totalRecord: number;
};
