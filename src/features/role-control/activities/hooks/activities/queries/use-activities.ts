import { useQuery } from '@tanstack/react-query';
import { activitiesKeys } from '../../../constants/activitiesKeys';
import { activitiesApi } from '../../../api/activities-api';

export const useActivities = () => {
  return useQuery({
    queryKey: activitiesKeys.list(),
    queryFn: () => activitiesApi.getActivities(),
    select: (data) => data.data,
  });
};
