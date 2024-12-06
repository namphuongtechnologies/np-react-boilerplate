import { useQuery } from '@tanstack/react-query';
import { usersKeys } from '~/features/role-control/users/constants/usersKeys';
import { usersApi } from '~/features/role-control/users/api/users-api';

export const useUser = (userId?: string) => {
  return useQuery({
    queryKey: usersKeys.detail(userId),
    queryFn: () => usersApi.detail(userId!),
    enabled: Boolean(userId),
  });
};
