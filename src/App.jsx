// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Product from './pages/product/Product';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/home/Dashboard';
import OrderPage from './pages/order/Order';
import ProtectedRoute from './components/protrctedRoutes';
import ProductPage from './pages/product/Product';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/products" element={<ProductPage />} />
      </Route>

      {/* Redirect to login for undefined routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
