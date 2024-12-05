import { useIsMutating, useMutation } from '@tanstack/react-query';
import { queryClient } from '~/config/query-client';
import { activitiesApi } from '../../../api/activities-api';
import { activitiesKeys } from '../../../constants/activitiesKeys';

type CreateActivityParams = Parameters<typeof activitiesApi.create>;
type Variables = CreateActivityParams[0];

queryClient.setMutationDefaults(activitiesKeys.create(), {
  mutationFn: (variables: Variables) => activitiesApi.create(variables),
});

export const useCreateActivity = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: activitiesKeys.create(),
  });

  const isMutating = useIsMutating({ mutationKey: activitiesKeys.create() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: activitiesKeys.all });
  };

  return { ...mutation, isPending, invalidate };
};
