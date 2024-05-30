import { Navigate, Route, Routes } from 'react-router-dom';
import About from './pages/about';

const AboutRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<About />} />
      <Route path='*' element={<Navigate to='/not-found' />} />
    </Routes>
  );
};

export default AboutRoutes;
