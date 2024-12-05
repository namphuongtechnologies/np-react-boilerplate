import { useIsMutating, useMutation } from '@tanstack/react-query';
import { queryClient } from '~/config/query-client';
import { activitiesApi } from '../../../api/activities-api';
import { activitiesKeys } from '../../../constants/activitiesKeys';

type UpdateActivityParams = Parameters<typeof activitiesApi.update>;
type Variables = UpdateActivityParams[0];

queryClient.setMutationDefaults(activitiesKeys.update(), {
  mutationFn: (variables: Variables) => activitiesApi.update(variables),
});

export const useUpdateActivity = () => {
  const mutation = useMutation<unknown, Error, Variables>({ mutationKey: activitiesKeys.update() });

  const isMutating = useIsMutating({ mutationKey: activitiesKeys.update() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: activitiesKeys.all });
  };

  return { ...mutation, isPending, invalidate };
};
