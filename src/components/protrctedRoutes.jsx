// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { cookies } from '../helpers/cookies.jsx';

const ProtectedRoute = () => {
  const token = cookies.get('token');

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;