import { useIsMutating, useMutation } from '@tanstack/react-query';

import { queryClient } from '~/config/query-client';
import { roleActivitiesApi } from '~/features/role-control/roles/api/role-activities-api';
import { rolesKeys } from '~/features/role-control/roles/constants/rolesKeys';

type UpdateRoleActivitiesParams = Parameters<typeof roleActivitiesApi.update>;
type Variables = UpdateRoleActivitiesParams[0];

queryClient.setMutationDefaults(rolesKeys.updateRoleActivities(), {
  mutationFn: (variables: Variables) => roleActivitiesApi.update(variables),
});

export const useUpdateRoleActivities = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: rolesKeys.updateRoleActivities(),
  });

  const isMutating = useIsMutating({ mutationKey: rolesKeys.delete() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = (roleId?: string) => {
    queryClient.invalidateQueries({ queryKey: rolesKeys.roleActivities(roleId) });
  };

  return { ...mutation, isPending, invalidate };
};
