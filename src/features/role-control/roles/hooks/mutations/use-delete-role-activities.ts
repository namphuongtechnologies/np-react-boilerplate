import { useIsMutating, useMutation } from '@tanstack/react-query';
import { queryClient } from '~/config/query-client';
import { roleActivitiesApi } from '~/features/role-control/roles/api/role-activities-api';
import { rolesKeys } from '~/features/role-control/roles/constants/rolesKeys';

type DeleteRoleActivitiesParams = Parameters<typeof roleActivitiesApi.delete>;
type Variables = DeleteRoleActivitiesParams[0];

queryClient.setMutationDefaults(rolesKeys.deleteRoleActivities(), {
  mutationFn: (variables: Variables) => roleActivitiesApi.delete(variables),
});

export const useDeleteRoleActivities = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: rolesKeys.deleteRoleActivities(),
  });

  const isMutating = useIsMutating({ mutationKey: rolesKeys.deleteRoleActivities() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = (roleId?: string) => {
    queryClient.invalidateQueries({ queryKey: rolesKeys.roleActivities(roleId) });
  };

  return { ...mutation, isPending, invalidate };
};
