// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/user/Login'; // Path to your Login component
import Register from './components/user/Register'; // Create a Register component
import Product from './components/products/Product';
import Dashboard from './components/home/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />{' '}
      <Route path="/login" element={<Login />} />{' '}
      <Route path="/product" element={<Product />} />{' '}
      <Route path="/dashboard" element={<Dashboard />} />{' '}
      {/* Define your register route */}
    </Routes>
  );
};

export default App;
