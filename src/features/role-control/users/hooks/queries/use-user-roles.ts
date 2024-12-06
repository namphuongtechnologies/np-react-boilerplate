import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { usersKeys } from '~/features/role-control/users/constants/usersKeys';
import { userRolesApi } from '~/features/role-control/users/api/user-roles-api';

export const useUserRoles = (userId?: string) => {
  const query = useQuery({
    queryKey: usersKeys.userRoles(userId),
    queryFn: () => userRolesApi.getUserRoles(userId!),
    enabled: Boolean(userId),
    refetchOnMount: true,
  });

  const userRoles = useMemo(() => {
    if (!query.data) return [];
    return query.data.data.Data;
  }, [query.data]);

  return { ...query, userRoles };
};
