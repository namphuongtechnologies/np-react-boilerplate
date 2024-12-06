import { activitiesKeys } from '~/features/role-control/activities/constants/activitiesKeys';
import { rolesKeys } from '~/features/role-control/roles/constants/rolesKeys';

export const usersKeys = {
  all: ['users'],
  lists: () => [...usersKeys.all, 'list'],
  list: (filter?: unknown) => [...usersKeys.all, 'list', filter],
  detail: (id?: string) => [...usersKeys.all, 'detail', id],
  create: () => [...usersKeys.all, 'create'],
  update: () => [...usersKeys.all, 'update'],
  delete: () => [...usersKeys.all, 'delete'],
  userRoles: (id?: string) => [...usersKeys.all, ...rolesKeys.all, 'userRoles', id],
  createUserRoles: () => [...usersKeys.all, 'createUserRoles'],
  deleteUserRoles: () => [...usersKeys.all, 'deleteUserRoles'],
  userActivities: (id?: string) => [...usersKeys.all, ...activitiesKeys.all, 'userActivities', id],
  createUserActivities: () => [...usersKeys.all, 'createUserActivities'],
  updateUserActivities: () => [...usersKeys.all, 'updateUserActivities'],
  deleteUserActivities: () => [...usersKeys.all, 'deleteUserActivities'],
};
