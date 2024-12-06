import { useIsMutating, useMutation } from '@tanstack/react-query';

import { usersKeys } from '~/features/role-control/users/constants/usersKeys';
import { queryClient } from '~/config/query-client';
import { usersApi } from '~/features/role-control/users/api/users-api';

type CreateUserParams = Parameters<typeof usersApi.create>;
type Variables = CreateUserParams[0];

queryClient.setMutationDefaults(usersKeys.create(), {
  mutationFn: (variables: Variables) => usersApi.create(variables),
});

export const useCreateUser = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: usersKeys.create(),
  });

  const isMutating = useIsMutating({ mutationKey: usersKeys.create() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: usersKeys.all });
  };

  return { ...mutation, isPending, invalidate };
};
