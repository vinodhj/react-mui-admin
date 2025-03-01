import React, { lazy } from 'react';

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
import CreateTeam from '../pages/team/create';
import Profile from '../pages/settings';
import ChangePassword from '../pages/settings/change-password';
import EditProfile from '../pages/settings/edit-profile';
import Faq from '../pages/settings/faq';

const RevokeError = lazy(() => import('../pages/revoke'));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<PublicRoute element={<AuthLayout />} />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/revoke" element={<RevokeError />} />
      </Route>

      {/* Main Layout (Dashboard, other protected pages) */}
      <Route element={<ProtectedRoute element={<MainLayout />} />}>
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Team routes */}
        <Route path="/team" element={<ProtectedRoute element={<Team />} allowedRoles={['ADMIN']} />} />
        <Route path="/team/create" element={<ProtectedRoute element={<CreateTeam />} allowedRoles={['ADMIN']} />} />
        <Route path="/team/:id" element={<ProtectedRoute element={<TeamDetails />} allowedRoles={['ADMIN']} />} />
        <Route path="/team/edit/:id" element={<ProtectedRoute element={<EditTeam />} allowedRoles={['ADMIN']} />} />

        {/* Settings */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* FAQ */}
        <Route path="/faq" element={<ProtectedRoute element={<Faq />} />} />

        {/* Catch-all: 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
