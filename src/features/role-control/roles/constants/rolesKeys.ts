import { activitiesKeys } from '../../activities/constants/activitiesKeys';

export const rolesKeys = {
  all: ['roles'],
  lists: () => [...rolesKeys.all, 'list'],
  list: (filter?: unknown) => [...rolesKeys.all, filter],
  details: () => [...rolesKeys.all, 'details'],
  detail: (id?: string) => [...rolesKeys.details(), id],
  create: () => [...rolesKeys.all, 'create'],
  update: () => [...rolesKeys.all, 'update'],
  delete: () => [...rolesKeys.all, 'delete'],
  roleActivities: (roleId?: string) => [
    ...rolesKeys.all,
    ...activitiesKeys.all,
    'roleActivities',
    roleId,
  ],
  createRoleActivities: () => [...rolesKeys.all, 'createRoleActivities'],
  updateRoleActivities: () => [...rolesKeys.all, 'updateRoleActivities'],
  deleteRoleActivities: () => [...rolesKeys.all, 'deleteRoleActivities'],
};
