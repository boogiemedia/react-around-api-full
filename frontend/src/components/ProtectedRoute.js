import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
const ProtectedRoute = (props) => {
  return props.onLogin ? <Outlet /> : <Navigate to='/login' />;
};
export default ProtectedRoute;
