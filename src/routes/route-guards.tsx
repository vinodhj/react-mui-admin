import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../hooks/use-session';

export const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const { session } = useSession();
  return session.token ? element : <Navigate to="/" replace />;
};

export const PublicRoute = ({ element }: { element: React.ReactNode }) => {
  const { session } = useSession();
  return session.token ? <Navigate to="/dashboard" replace /> : element;
};
