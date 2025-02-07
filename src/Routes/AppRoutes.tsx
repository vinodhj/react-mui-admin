// src/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../components/Auth';
import Dashboard from '../Dashboard';
import NotFoundPage from '../components/NotFoundPage';
import { ProtectedRoute, PublicRoute } from './RouteGuards';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute element={<Auth />} />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
