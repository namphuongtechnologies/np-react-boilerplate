import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import { AuthLayout, MainLayout } from '~/components/layouts';
import { NotFound } from './components/errors';
import { ProtectedRoute } from './features/auth/components';

const AuthRoutes = lazy(() => import('./features/auth'));
const ProductsRoutes = lazy(() => import('./features/products'));
const AboutRoutes = lazy(() => import('./features/about'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/' element={<div>Dashboard</div>} />
        <Route path='/about' element={<AboutRoutes />} />
        <Route path='/products/*' element={<ProductsRoutes />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path='/auth/*' element={<AuthRoutes />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
