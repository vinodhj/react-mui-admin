import React from 'react';
import MainLayout from '../layouts/main-layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './route-guards';
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
import Category from '../pages/category';
import CategoryDetails from '../pages/category/details';
import CreateCategory from '../pages/category/create';
import ErrorPage from '../pages/error';
import EditCategory from '../pages/category/edit';
import Expense from '../pages/expense';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Main Layout (Dashboard, other protected pages) */}
      <Route element={<ProtectedRoute element={<MainLayout />} />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Settings */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Team routes */}
        <Route path="team">
          <Route index element={<ProtectedRoute element={<Team />} allowedRoles={['ADMIN']} />} />
          <Route path="create" element={<ProtectedRoute element={<CreateTeam />} allowedRoles={['ADMIN']} />} />
          <Route path=":id" element={<ProtectedRoute element={<TeamDetails />} allowedRoles={['ADMIN']} />} />
          <Route path="edit/:id" element={<ProtectedRoute element={<EditTeam />} allowedRoles={['ADMIN']} />} />
        </Route>

        {/* Category routes */}
        <Route path="category">
          <Route index element={<Navigate to="/category/tag" replace />} />
          <Route path=":type" element={<Category />} />
          <Route path=":type/create" element={<CreateCategory />} />
          <Route path=":type/:id" element={<CategoryDetails />} />
          <Route path=":type/edit/:id" element={<EditCategory />} />
        </Route>

        {/* expense routes */}
        <Route path="expense">
          <Route index element={<Expense />} />
          {/* <Route path="create" element={<Expense />} />
          <Route path=":id" element={<Expense />} />
          <Route path="edit/:id" element={<Expense />} /> */}
        </Route>

        {/* FAQ */}
        <Route path="/faq" element={<ProtectedRoute element={<Faq />} />} />

        <Route path="/error" element={<ErrorPage />} />
        {/* Catch-all: 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
