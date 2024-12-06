import { useIsMutating, useMutation } from '@tanstack/react-query';

import { queryClient } from '~/config/query-client';
import { userActivitiesApi } from '~/features/role-control/users/api/user-activities-api';
import { usersKeys } from '~/features/role-control/users/constants/usersKeys';

type UpdateUserActivitiesParams = Parameters<typeof userActivitiesApi.update>;
type Variables = UpdateUserActivitiesParams[0];

queryClient.setMutationDefaults(usersKeys.updateUserActivities(), {
  mutationFn: (variables: Variables) => userActivitiesApi.update(variables),
});

export const useUpdateUserActivities = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: usersKeys.updateUserActivities(),
  });

  const isMutating = useIsMutating({ mutationKey: usersKeys.updateUserActivities() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = (userId?: string) => {
    queryClient.invalidateQueries({ queryKey: usersKeys.userActivities(userId) });
  };

  return { ...mutation, isPending, invalidate };
};
