import { useQuery } from '@tanstack/react-query';

import { activitiesKeys } from '~/features/role-control/activities/constants/activitiesKeys';
import { activitiesApi } from '~/features/role-control/activities/api/activities-api';

export const useActivities = () => {
  return useQuery({
    queryKey: activitiesKeys.list(),
    queryFn: () => activitiesApi.getActivities(),
    select: (data) => data.data,
  });
};
