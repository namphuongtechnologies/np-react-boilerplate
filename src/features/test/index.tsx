import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from '~/components/errors';

const Test = lazy(() => import('./pages/index'));

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route index element={<Test />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default ProductsRoutes;
