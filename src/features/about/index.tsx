import { Permission } from '@namphuongtechnologi/react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { User_Permission_Code } from '~/config/permission';
import About from './pages/about';

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
      <Route path='*' element={<Navigate to='/not-found' />} />
    </Routes>
  );
};

export default AboutRoutes;
