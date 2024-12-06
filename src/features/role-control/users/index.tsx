import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '~/components/errors/not-found';

const Users = lazy(() => import('~/features/role-control/users/pages/users'));
const User = lazy(() => import('~/features/role-control/users/pages/user'));

const UsersRoutes = () => {
  return (
    <Routes>
      <Route index element={<Users />} />
      <Route path=':id' element={<User />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default UsersRoutes;
