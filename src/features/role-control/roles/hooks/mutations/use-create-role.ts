import { useIsMutating, useMutation } from '@tanstack/react-query';

import { rolesApi } from '~/features/role-control/roles/api/roles-api';
import { rolesKeys } from '~/features/role-control/roles/constants/rolesKeys';
import { queryClient } from '~/config/query-client';

type CreateRoleParams = Parameters<typeof rolesApi.create>;
type Variables = CreateRoleParams[0];

queryClient.setMutationDefaults(rolesKeys.create(), {
  mutationFn: (variables: Variables) => rolesApi.create(variables),
});

export const useCreateRole = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: rolesKeys.create(),
  });

  const isMutating = useIsMutating({ mutationKey: rolesKeys.create() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: rolesKeys.all });
  };

  return { ...mutation, isPending, invalidate };
};
