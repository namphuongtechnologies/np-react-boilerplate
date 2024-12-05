import { useIsMutating, useMutation } from '@tanstack/react-query';

import { rolesApi } from '~/features/role-control/roles/api/roles-api';
import { rolesKeys } from '~/features/role-control/roles/constants/rolesKeys';
import { queryClient } from '~/config/query-client';

type UpdateRoleParams = Parameters<typeof rolesApi.update>;
type Variables = UpdateRoleParams[0];

queryClient.setMutationDefaults(rolesKeys.update(), {
  mutationFn: (variables: Variables) => rolesApi.update(variables),
});

export const useUpdateRole = () => {
  const mutation = useMutation<unknown, Error, Variables>({ mutationKey: rolesKeys.update() });

  const isMutating = useIsMutating({ mutationKey: rolesKeys.update() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: rolesKeys.all });
  };

  return { ...mutation, isPending, invalidate };
};
