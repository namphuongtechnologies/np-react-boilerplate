import type { AxiosRequestConfig } from 'axios';
import type { Key } from 'react';

import { jpAxios } from '~/config/axios';
import type { BaseResponse } from '~/types/BaseResponse';
import type { UserRole } from '~/features/role-control/users/types/User';

const BASE_URL = `/sysuserroles`;

export const userRolesApi = {
  getUserRoles: (userId: string, config?: AxiosRequestConfig) => {
    const url = `${BASE_URL}/get-user-roles`;
    return jpAxios.instance.get<BaseResponse<UserRole[]>>(url, {
      params: { userId },
      ...config,
    });
  },
  create: (payload: { userId: string; roleIds: string[] | Key[] }, config?: AxiosRequestConfig) => {
    const url = `${BASE_URL}/create-user-roles/${payload.userId}`;
    return jpAxios.instance.post(url, payload.roleIds, config);
  },
  delete: (payload: string[], config?: AxiosRequestConfig) => {
    return jpAxios.instance.delete(`${BASE_URL}/delete-user-roles`, {
      data: payload,
      ...config,
    });
  },
};
