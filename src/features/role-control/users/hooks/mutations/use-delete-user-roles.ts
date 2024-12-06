import { useIsMutating, useMutation } from '@tanstack/react-query';

import { usersKeys } from '~/features/role-control/users/constants/usersKeys';
import { queryClient } from '~/config/query-client';
import { userRolesApi } from '~/features/role-control/users/api/user-roles-api';

type DeleteRoleActivitiesParams = Parameters<typeof userRolesApi.delete>;
type Variables = DeleteRoleActivitiesParams[0];

queryClient.setMutationDefaults(usersKeys.deleteUserRoles(), {
  mutationFn: (variables: Variables) => userRolesApi.delete(variables),
});

export const useDeleteUserRoles = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: usersKeys.deleteUserRoles(),
  });

  const isMutating = useIsMutating({ mutationKey: usersKeys.deleteUserRoles() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = (roleId?: string) => {
    queryClient.invalidateQueries({ queryKey: usersKeys.userRoles(roleId) });
  };

  return { ...mutation, isPending, invalidate };
};
