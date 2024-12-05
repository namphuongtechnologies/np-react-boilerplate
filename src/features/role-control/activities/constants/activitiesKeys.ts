export const activitiesKeys = {
  all: ['activities'],
  lists: () => [...activitiesKeys.all, 'list'],
  list: (filter?: unknown) => [...activitiesKeys.all, filter],
  details: () => [...activitiesKeys.all, 'details'],
  detail: (id?: string) => [...activitiesKeys.details(), id],
  create: () => [...activitiesKeys.all, 'create'],
  update: () => [...activitiesKeys.all, 'update'],
  delete: () => [...activitiesKeys.all, 'delete'],
};
