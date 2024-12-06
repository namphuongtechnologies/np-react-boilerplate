import type { AxiosRequestConfig } from 'axios';

import { jpAxios } from '~/config/axios';
import type { BaseFilterParams } from '~/types/BaseFilterParams';
import type { BaseResponse } from '~/types/BaseResponse';
import type { User } from '~/features/role-control/users/types/User';

const BASE_URL = `/user`;

export const usersApi = {
  getUsers: (params?: BaseFilterParams, config?: AxiosRequestConfig) => {
    const url = `${BASE_URL}/get-users`;
    return jpAxios.instance.get<BaseResponse<User[]>>(url, { params, ...config });
  },
  getInfoMine: () => {
    return jpAxios.instance.get<{ User: User; Permissions: unknown[] }>(
      `${BASE_URL}/get-info-mine`
    );
  },
  create: (user: FormData) => {
    return jpAxios.instance.post(`${BASE_URL}/create`, user);
  },
  update: (body: { id: string; formData: FormData }) => {
    return jpAxios.instance.post(`${BASE_URL}/update/${body.id}`, body.formData);
  },
  delete: (userId: string) => {
    return jpAxios.instance.delete(`${BASE_URL}/delete/${userId}`);
  },
  detail: (userId: string) => {
    return jpAxios.instance.get(`${BASE_URL}/get-detail/${userId}`);
  },
};
