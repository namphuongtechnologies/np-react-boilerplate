import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { userActivitiesApi } from '~/features/role-control/users/api/user-activities-api';
import { usersKeys } from '~/features/role-control/users/constants/usersKeys';

export const useUserActivities = (userId?: string) => {
  const query = useQuery({
    queryKey: usersKeys.userActivities(userId),
    queryFn: ({ signal }) => userActivitiesApi.getUserActivities({ userId }, { signal }),
    enabled: Boolean(userId),
  });

  const userActivities = useMemo(() => {
    if (!query.data) return [];
    return query.data.data.Data.Activities;
  }, [query.data]);

  return { ...query, userActivities };
};
