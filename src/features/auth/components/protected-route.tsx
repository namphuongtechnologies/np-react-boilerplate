import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthToken } from '~/store/auth';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const isSignedIn = useAuthToken((store) => !!store.accessToken);

  if (!isSignedIn) {
    return <Navigate to='/auth/sign-in' replace />;
  }

  return children;
};
