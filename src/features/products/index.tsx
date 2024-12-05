import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import NotFound from '~/components/errors/not-found';

const Products = lazy(() => import('~/features/products/pages/products'));
const ProductCreate = lazy(() => import('~/features/products/pages/product-create'));
const ProductEdit = lazy(() => import('~/features/products/pages/product-edit'));
const ProductDetail = lazy(() => import('~/features/products/pages/product-detail'));

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path='create' element={<ProductCreate />} />
      <Route path=':id' element={<ProductDetail />} />
      <Route path=':id/edit' element={<ProductEdit />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default ProductsRoutes;
