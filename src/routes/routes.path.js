import Product from '../components/products/Product';
import Register from '../components/user/Register';
import Login from '../components/user/Login';
import Dashboard from '../components/home/Dashboard';
import OrderPage from '../components/orders/Order';

export const routes = [
  {
    path: '/products',
    element: <Product />,
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
