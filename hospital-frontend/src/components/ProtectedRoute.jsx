import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or a spinner, while session restores from localStorage
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Redirect to respective authorized home if role mismatch
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
