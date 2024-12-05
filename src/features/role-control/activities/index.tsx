import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '~/components/errors/not-found';

const Activities = lazy(() => import('~/features/role-control/activities/pages/activities'));

const ActivitiesRoutes = () => {
  return (
    <Routes>
      <Route index element={<Activities />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default ActivitiesRoutes;
