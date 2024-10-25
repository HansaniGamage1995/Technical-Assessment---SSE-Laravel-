import Dashboard from '../pages/home/Dashboard';
import Login from '../pages/login/Login';
import OrderPage from '../pages/order/Order';
import ProductPage from '../pages/product/Product';
import Register from '../pages/register/Register';

export const routes = [
  {
    path: '/products',
    element: <ProductPage />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/orders',
    element: <OrderPage />,
  },
];
