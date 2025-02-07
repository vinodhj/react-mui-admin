import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/getToken';

export const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  return getToken() ? element : <Navigate to="/" replace />;
};

export const PublicRoute = ({ element }: { element: React.ReactNode }) => {
  return getToken() ? <Navigate to="/dashboard" replace /> : element;
};
