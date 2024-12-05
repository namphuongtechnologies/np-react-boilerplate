import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from './components/layouts/main-layout';
import AuthLayout from './components/layouts/auth-layout';
import NotFound from './components/errors/not-found';

import ProtectedRoute from './features/auth/components/protected-route';
import PermissionProvider from './features/auth/components/permission-provider';

const Dashboard = lazy(() => import('./features/dashboard'));
const AuthRoutes = lazy(() => import('./features/auth'));
const ProductsRoutes = lazy(() => import('./features/products'));
const AboutRoutes = lazy(() => import('./features/about'));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route
        element={
          <ProtectedRoute>
            <PermissionProvider>
              <MainLayout />
            </PermissionProvider>
          </ProtectedRoute>
        }
      >
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
