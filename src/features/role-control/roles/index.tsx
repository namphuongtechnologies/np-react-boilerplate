import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '~/components/errors/not-found';

const Roles = lazy(() => import('~/features/role-control/roles/pages/roles'));
const Role = lazy(() => import('~/features/role-control/roles/pages/role'));

const RolesRoutes = () => {
  return (
    <Routes>
      <Route index element={<Roles />} />
      <Route path=':id' element={<Role />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default RolesRoutes;
