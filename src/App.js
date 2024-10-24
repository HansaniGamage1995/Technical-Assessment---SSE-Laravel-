// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Product from './pages/product/Product';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/home/Dashboard';
import OrderPage from './pages/order/Order';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />{' '}
      <Route path="/login" element={<Login />} />{' '}
      <Route path="/product" element={<Product />} />{' '}
      <Route path="/dashboard" element={<Dashboard />} />{' '}
      <Route path="/orders" element={<OrderPage />} />{' '}
      {/* Define your register route */}
    </Routes>
  );
};

export default App;
