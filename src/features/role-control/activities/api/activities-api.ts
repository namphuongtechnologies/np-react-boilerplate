import type { AxiosRequestConfig } from 'axios';
import omit from 'lodash/omit';
import { jpAxios } from '~/config/axios';
import type { BaseResponse } from '~/types/BaseResponse';
import type { Activity } from '../types/Activity';

const BASE_URL = `/sysactivities`;

export const activitiesApi = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getActivities(params?: any, config?: AxiosRequestConfig) {
    const url = `${BASE_URL}/get-activities`;
    return jpAxios.instance.get<BaseResponse<Activity[]>>(url, { params, ...config });
  },
  getActivity(id: string, config?: AxiosRequestConfig) {
    return jpAxios.instance.get(`${BASE_URL}/get-detail-activity/${id}`, config);
  },
  create(
    newActivity: Omit<Activity, 'id' | 'createdDatetime' | 'updatedDatetime'>,
    config?: AxiosRequestConfig
  ) {
    return jpAxios.instance.post<BaseResponse<true>>(
      `${BASE_URL}/create-activity`,
      newActivity,
      config
    );
  },
  update(newActivity: Partial<Activity>, config?: AxiosRequestConfig) {
    return jpAxios.instance.put(
      `${BASE_URL}/update-activity/${newActivity.Id}`,
      omit(newActivity, 'Id'),
      config
    );
  },
  delete(id: string, config?: AxiosRequestConfig) {
    return jpAxios.instance.delete(`${BASE_URL}/delete-activity/${id}`, config);
  },
};
