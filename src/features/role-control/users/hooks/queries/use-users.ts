import { useQuery } from '@tanstack/react-query';

import { usersApi } from '~/features/role-control/users/api/users-api';
import { usersKeys } from '~/features/role-control/users/constants/usersKeys';
import type { BaseFilterParams } from '~/types/BaseFilterParams';

export const useUsers = (params?: BaseFilterParams) => {
  const query = useQuery({
    queryKey: usersKeys.list(params),
    queryFn: ({ signal }) => usersApi.getUsers(params, { signal }),
    refetchOnMount: true,
  });

  const findUserById = (id?: string) => {
    if (!query.data || !id) return;
    return query.data.data.Data.find((user) => user.Id === id);
  };

  return { ...query, findUserById };
};
