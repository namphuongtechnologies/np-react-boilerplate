import { useIsMutating, useMutation } from '@tanstack/react-query';
import { queryClient } from '~/config/query-client';
import { activitiesApi } from '../../../api/activities-api';
import { activitiesKeys } from '../../../constants/activitiesKeys';

type DeleteActivityParams = Parameters<typeof activitiesApi.delete>;
type Variables = DeleteActivityParams[0];

queryClient.setMutationDefaults(activitiesKeys.delete(), {
  mutationFn: (variables: Variables) => activitiesApi.delete(variables),
});

export const useDeleteActivity = () => {
  const mutation = useMutation<unknown, Error, Variables>({
    mutationKey: activitiesKeys.delete(),
  });

  const isMutating = useIsMutating({ mutationKey: activitiesKeys.delete() });

  const isPending = mutation.isPending || Boolean(isMutating);

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: activitiesKeys.all });
  };

  return { ...mutation, isPending, invalidate };
};
