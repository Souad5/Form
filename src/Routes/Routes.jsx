import { createBrowserRouter } from 'react-router';
import StoreForm from '../Components/Storeform';
import Product from '../Pages/Product';
import ProductDetails from './../Pages/ProductDetails';

const router = createBrowserRouter([
  { path: '/', element: <StoreForm /> },
  { path: '/products', element: <Product /> },
  { path: '/products/:id', element: <ProductDetails /> }
]);

export default router;