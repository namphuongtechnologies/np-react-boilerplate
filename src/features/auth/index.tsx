import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { NotFound } from '~/components/errors';

const SignIn = lazy(() => import('./pages/sign-in'));
const SignUp = lazy(() => import('./pages/sign-up'));

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='sign-in' element={<SignIn />} />
      <Route path='sign-up' element={<SignUp />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
