import type { AxiosRequestConfig } from 'axios';

import { jpAxios } from '~/config/axios';
import type { BaseResponse } from '~/types/BaseResponse';
import type { RoleActivity } from '~/features/role-control/roles/types/RoleActivity';

const BASE_URL = `/sysroleactivities`;
export const roleActivitiesApi = {
  getRoleActivities(roleId: string, options?: AxiosRequestConfig) {
    return jpAxios.instance.get<
      BaseResponse<{ Activities: RoleActivity[]; RoleId: string; RoleName: string }>
    >(`${BASE_URL}/get-role-activities/${roleId}`, options);
  },
  create(payload: { roleId: string; activities: unknown[] }, config?: AxiosRequestConfig) {
    return jpAxios.instance.post(
      `${BASE_URL}/create-role-activities/${payload.roleId}`,
      payload.activities,
      config
    );
  },
  update(payload: RoleActivity[], config?: AxiosRequestConfig) {
    return jpAxios.instance.put(`${BASE_URL}/update-role-activities`, payload, config);
  },
  delete(payload: string[], config?: AxiosRequestConfig) {
    return jpAxios.instance.delete(`${BASE_URL}/delete-role-activities`, {
      data: payload,
      ...config,
    });
  },
};
