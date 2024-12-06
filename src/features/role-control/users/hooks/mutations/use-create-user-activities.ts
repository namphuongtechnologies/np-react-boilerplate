import { useIsMutating, useMutation } from '@tanstack/react-query';
import { queryClient } from '~/config/query-client';
import { userActivitiesApi } from '~/features/role-control/users/api/user-activities-api';
import { usersKeys } from '~/features/role-control/users/constants/usersKeys';

type CreateUserActivitiesParams = Parameters<typeof userActivitiesApi.create>;
type Variables = CreateUserActivitiesParams[0];

queryClient.setMutationDefaults(usersKeys.createUserActivities(), {
  mutationFn: (variables: Variables) => userActivitiesApi.create(variables),
});

export const useCreateUserActivities = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: usersKeys.createUserActivities(),
  });

  const isMutating = useIsMutating({ mutationKey: usersKeys.createUserActivities() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = (userId?: string) => {
    queryClient.invalidateQueries({ queryKey: usersKeys.userActivities(userId) });
  };

  return { ...mutation, isPending, invalidate };
};
