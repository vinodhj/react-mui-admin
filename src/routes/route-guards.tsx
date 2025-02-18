import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSession } from '../hooks/use-session';
import { SessionContext } from '../contexts/session-context';
import AccessDenied from '../pages/access-denied';

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles?: string[]; // Define which roles can access this route
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
}: {
  element: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { session } = useContext(SessionContext) ?? {};
  const location = useLocation();

  if (!session?.token) {
    // User is not authenticated, redirect to login
    // 401 Unauthorized: User is not logged in
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(session.adminRole)) {
    // User does not have permission to access this route
    // 403 Forbidden: User lacks permission
    return <AccessDenied />;
  }

  return session.token ? element : <Navigate to="/" replace />;
};

export const PublicRoute = ({ element }: { element: React.ReactNode }) => {
  const { session } = useSession();
  return session.token ? <Navigate to="/dashboard" replace /> : element;
};
