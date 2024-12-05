import type { AxiosRequestConfig } from 'axios';
import { jpAxios } from '~/config/axios';
import type { Role } from '~/features/role-control/roles/types/Role';
import type { BaseFilterParams } from '~/types/BaseFilterParams';
import type { BaseResponse } from '~/types/BaseResponse';

const BASE_URL = `/sysroles`;

export const rolesApi = {
  getRoles(params?: BaseFilterParams, config?: AxiosRequestConfig) {
    return jpAxios.instance.get<BaseResponse<Role[]>>(`${BASE_URL}/get-roles`, {
      params,
      ...config,
    });
  },
  getRole(id: string, config?: AxiosRequestConfig) {
    return jpAxios.instance.get(`${BASE_URL}/get-detail/${id}`, config);
  },
  create(newRole: Omit<Role, 'Id' | 'CreatedDate' | 'Creator'>, config?: AxiosRequestConfig) {
    return jpAxios.instance.post(`${BASE_URL}/create`, newRole, config);
  },
  update(newRole: Partial<Role>, config?: AxiosRequestConfig) {
    return jpAxios.instance.put(`${BASE_URL}/update/${newRole.Id}`, newRole, config);
  },
  delete(id: string, config?: AxiosRequestConfig) {
    return jpAxios.instance.delete(`${BASE_URL}/delete/${id}`, config);
  },
};
