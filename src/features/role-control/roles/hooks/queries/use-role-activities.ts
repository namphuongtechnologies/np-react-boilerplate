import { useQuery } from '@tanstack/react-query';

import { rolesKeys } from '~/features/role-control/roles/constants/rolesKeys';
import { roleActivitiesApi } from '~/features/role-control/roles/api/role-activities-api';

export const useRoleActivities = (roleId?: string) => {
  return useQuery({
    queryKey: rolesKeys.roleActivities(roleId),
    queryFn: () => roleActivitiesApi.getRoleActivities(roleId!),
    enabled: Boolean(roleId),
    refetchOnMount: true,
  });
};
