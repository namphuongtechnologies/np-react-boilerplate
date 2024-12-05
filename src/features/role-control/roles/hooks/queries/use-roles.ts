import { useQuery } from '@tanstack/react-query';

import { rolesApi } from '~/features/role-control/roles/api/roles-api';
import { rolesKeys } from '~/features/role-control/roles/constants/rolesKeys';
import type { BaseFilterParams } from '~/types/BaseFilterParams';

export const useRoles = (filter?: BaseFilterParams) => {
  return useQuery({
    queryKey: rolesKeys.list(filter),
    queryFn: ({ signal }) => rolesApi.getRoles(filter, { signal }),
    select: (data) => data.data,
    refetchOnMount: true,
  });
};
