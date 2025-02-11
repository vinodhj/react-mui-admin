import React, { lazy } from 'react';

import AuthLayout from '../layouts/auth-layout';
import MainLayout from '../layouts/main-layout';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './route-guards';

const SignIn = lazy(() => import('../pages/signin'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const Team = lazy(() => import('../pages/team'));
const NotFoundPage = lazy(() => import('../pages/not-found'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicRoute element={<AuthLayout />} />}>
        <Route path="/" element={<SignIn />} />
      </Route>

      {/* Main Layout (Dashboard, other protected pages) */}
      <Route element={<ProtectedRoute element={<MainLayout />} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/team" element={<Team />} />
        {/* Add more protected routes here if you want */}

        {/* Catch-all: Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Catch-all: Not Found
      <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
