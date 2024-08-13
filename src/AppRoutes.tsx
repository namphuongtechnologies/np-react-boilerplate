import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AuthLayout, MainLayout } from '~/components/layouts';
import { NotFound } from './components/errors';
import { ProtectedRoute } from './features/auth/components';

const Dashboard = lazy(() => import('./features/dashboard'));
const AuthRoutes = lazy(() => import('./features/auth'));
const ProductsRoutes = lazy(() => import('./features/products'));
const AboutRoutes = lazy(() => import('./features/about'));
const TestRoutes = lazy(() => import('./features/test'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/about' element={<AboutRoutes />} />
        <Route path='/products/*' element={<ProductsRoutes />} />
        <Route path='/test' element={<TestRoutes />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path='/auth/*' element={<AuthRoutes />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
