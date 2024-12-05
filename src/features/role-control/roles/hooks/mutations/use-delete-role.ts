import { useIsMutating, useMutation } from '@tanstack/react-query';
import { rolesApi } from '~/features/role-control/roles/api/roles-api';
import { rolesKeys } from '~/features/role-control/roles/constants/rolesKeys';
import { queryClient } from '~/config/query-client';

type DeleteRoleParams = Parameters<typeof rolesApi.delete>;
type Variables = DeleteRoleParams[0];

queryClient.setMutationDefaults(rolesKeys.delete(), {
  mutationFn: (variables: Variables) => rolesApi.delete(variables),
});

export const useDeleteRole = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: rolesKeys.delete(),
  });

  const isMutating = useIsMutating({ mutationKey: rolesKeys.delete() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: rolesKeys.all });
  };

  return { ...mutation, isPending, invalidate };
};
