import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Test = lazy(() => import('./pages/index'));

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route index element={<Test />} />
    </Routes>
  );
};

export default ProductsRoutes;
