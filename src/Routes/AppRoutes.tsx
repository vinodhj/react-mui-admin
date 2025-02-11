import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/signin';
import Dashboard from '../pages/dashboard';
import NotFoundPage from '../components/NotFoundPage';
import { ProtectedRoute, PublicRoute } from './RouteGuards';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute element={<SignIn />} />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
