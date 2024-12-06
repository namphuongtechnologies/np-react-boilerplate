import { useIsMutating, useMutation } from '@tanstack/react-query';

import { usersKeys } from '~/features/role-control/users/constants/usersKeys';
import { queryClient } from '~/config/query-client';
import { userRolesApi } from '~/features/role-control/users/api/user-roles-api';

type CreateRoleActivitiesParams = Parameters<typeof userRolesApi.create>;
type Variables = CreateRoleActivitiesParams[0];

queryClient.setMutationDefaults(usersKeys.createUserRoles(), {
  mutationFn: (variables: Variables) => userRolesApi.create(variables),
});

export const useCreateUserRoles = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: usersKeys.createUserRoles(),
  });

  const isMutating = useIsMutating({ mutationKey: usersKeys.createUserRoles() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = (roleId?: string) => {
    queryClient.invalidateQueries({ queryKey: usersKeys.userRoles(roleId) });
  };

  return { ...mutation, isPending, invalidate };
};
