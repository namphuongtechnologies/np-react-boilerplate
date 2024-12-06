import { useQuery } from '@tanstack/react-query';
import { usersApi } from '~/features/role-control/users/api/users-api';

export const useInfoMine = () => {
  return useQuery({
    queryKey: ['infoMine'],
    queryFn: () => usersApi.getInfoMine(),
  });
};
