import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const user = {};
  if (!user) return <Navigate to='/auth/sign-in' />;
  return children;
};
