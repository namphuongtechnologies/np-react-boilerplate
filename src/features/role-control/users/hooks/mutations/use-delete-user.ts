import { useIsMutating, useMutation } from '@tanstack/react-query';

import { queryClient } from '~/config/query-client';
import { usersKeys } from '~/features/role-control/users/constants/usersKeys';
import { usersApi } from '~/features/role-control/users/api/users-api';

type DeleteUserParams = Parameters<typeof usersApi.delete>;
type Variables = DeleteUserParams[0];

queryClient.setMutationDefaults(usersKeys.delete(), {
  mutationFn: (variables: Variables) => usersApi.delete(variables),
});

export const useDeleteUser = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: usersKeys.delete(),
  });

  const isMutating = useIsMutating({ mutationKey: usersKeys.delete() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: usersKeys.all });
  };

  return { ...mutation, isPending, invalidate };
};
