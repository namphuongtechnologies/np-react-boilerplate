import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '~/components/errors/not-found';

const ActivitiesRoutes = lazy(() => import('~/features/role-control/activities'));
const RolesRoutes = lazy(() => import('~/features/role-control/roles'));
const UsersRoutes = lazy(() => import('~/features/role-control/users'));

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route index element={<ActivitiesRoutes />} />
      <Route path='activities/*' element={<ActivitiesRoutes />} />
      <Route path='roles/*' element={<RolesRoutes />} />
      <Route path='users/*' element={<UsersRoutes />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default ProductsRoutes;
