import type { AxiosRequestConfig } from 'axios';

import { jpAxios } from '~/config/axios';
import type { BaseSearchParams } from '~/types/BaseFilterParams';
import type { UserActivity } from '~/features/role-control/users/types/User';
import type { BaseResponse } from '~/types/BaseResponse';

const BASE_URL = `/sysuseractivities`;

export const userActivitiesApi = {
  getUserActivities: (params: Pick<BaseSearchParams, 'userId'>, config?: AxiosRequestConfig) => {
    const url = `${BASE_URL}/get-user-activities`;
    return jpAxios.instance.get<BaseResponse<{ Activities: UserActivity[]; UserId: string }>>(url, {
      params,
      ...config,
    });
  },
  create: (payload: { userId: string; activities: unknown[] }, config?: AxiosRequestConfig) => {
    const { userId, activities = [] } = payload;
    return jpAxios.instance.post(
      `${BASE_URL}/create-user-activities/${userId}`,
      activities,
      config
    );
  },
  update: (activities: UserActivity[], config?: AxiosRequestConfig) => {
    return jpAxios.instance.put(`${BASE_URL}/update-user-activities`, activities, config);
  },
  delete: (payload: string[], config?: AxiosRequestConfig) => {
    return jpAxios.instance.delete(`${BASE_URL}/delete-user-activities`, {
      data: payload,
      ...config,
    });
  },
};
