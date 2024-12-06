import { useIsMutating, useMutation } from '@tanstack/react-query';

import { queryClient } from '~/config/query-client';
import { userActivitiesApi } from '~/features/role-control/users/api/user-activities-api';
import { usersKeys } from '~/features/role-control/users/constants/usersKeys';

type DeleteUserActivitiesParams = Parameters<typeof userActivitiesApi.delete>;
type Variables = DeleteUserActivitiesParams[0];

queryClient.setMutationDefaults(usersKeys.deleteUserActivities(), {
  mutationFn: (variables: Variables) => userActivitiesApi.delete(variables),
});

export const useDeleteUserActivities = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: usersKeys.deleteUserActivities(),
  });

  const isMutating = useIsMutating({ mutationKey: usersKeys.deleteUserActivities() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = (userId?: string) => {
    queryClient.invalidateQueries({ queryKey: usersKeys.userActivities(userId) });
  };

  return { ...mutation, isPending, invalidate };
};
