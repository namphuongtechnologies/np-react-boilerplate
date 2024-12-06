import { useIsMutating, useMutation } from '@tanstack/react-query';

import { usersKeys } from '~/features/role-control/users/constants/usersKeys';
import { queryClient } from '~/config/query-client';
import { usersApi } from '~/features/role-control/users/api/users-api';

type UpdateUserParams = Parameters<typeof usersApi.update>;
type Variables = UpdateUserParams[0];

queryClient.setMutationDefaults(usersKeys.update(), {
  mutationFn: (variables: Variables) => usersApi.update(variables),
});

export const useUpdateUser = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: usersKeys.update(),
  });

  const isMutating = useIsMutating({ mutationKey: usersKeys.update() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: usersKeys.all });
  };

  return { ...mutation, isPending, invalidate };
};
