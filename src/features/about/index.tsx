import { Permission } from '@namphuongtechnologi/react';
import { Route, Routes } from 'react-router-dom';

import { User_Permission_Code } from '~/config/permission';
import NotFound from '~/components/errors/not-found';
import About from '~/features/about/pages/about';

const AboutRoutes = () => {
  return (
    <Routes>
      <Route
        path=''
        element={
          <Permission isRoute record={{ [User_Permission_Code['ABOUT_ROUTE']]: ({ r }) => r }}>
            <About />
          </Permission>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AboutRoutes;
