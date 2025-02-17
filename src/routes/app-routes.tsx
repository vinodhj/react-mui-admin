import React from 'react';

import AuthLayout from '../layouts/auth-layout';
import MainLayout from '../layouts/main-layout';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './route-guards';

import SignIn from '../pages/signin';
import Dashboard from '../pages/dashboard';
import NotFoundPage from '../pages/not-found';
import Team from '../pages/team';
import TeamDetails from '../pages/team/details';
import EditTeam from '../pages/team/edit';
import DeleteTeam from '../pages/team/delete';
import CreateTeam from '../pages/team/create';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicRoute element={<AuthLayout />} />}>
        <Route path="/" element={<SignIn />} />
      </Route>

      {/* Main Layout (Dashboard, other protected pages) */}
      <Route element={<ProtectedRoute element={<MainLayout />} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Team routes */}
        <Route path="/team" element={<Team />} />
        <Route path="/team/create" element={<CreateTeam />} />
        <Route path="/team/:id" element={<TeamDetails />} />
        <Route path="/team/edit/:id" element={<EditTeam />} />
        <Route path="/team/delete/:id" element={<DeleteTeam />} />
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
