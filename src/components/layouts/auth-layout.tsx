import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthToken } from '~/store/auth';

export const AuthLayout = () => {
  const isSignedIn = useAuthToken((store) => !!store.accessToken);

  if (isSignedIn) {
    return <Navigate to='/' replace />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};
