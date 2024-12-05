import { useIsMutating, useMutation } from '@tanstack/react-query';

import { queryClient } from '~/config/query-client';
import { roleActivitiesApi } from '~/features/role-control/roles/api/role-activities-api';
import { rolesKeys } from '~/features/role-control/roles/constants/rolesKeys';

type AddRoleActivitiesParams = Parameters<typeof roleActivitiesApi.create>;
type Variables = AddRoleActivitiesParams[0];

queryClient.setMutationDefaults(rolesKeys.createRoleActivities(), {
  mutationFn: (variables: Variables) => roleActivitiesApi.create(variables),
});

export const useCreateRoleActivities = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: rolesKeys.createRoleActivities(),
  });

  const isMutating = useIsMutating({ mutationKey: rolesKeys.createRoleActivities() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = (roleId?: string) => {
    queryClient.invalidateQueries({ queryKey: rolesKeys.roleActivities(roleId) });
  };

  return { ...mutation, isPending, invalidate };
};
