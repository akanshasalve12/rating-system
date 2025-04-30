import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardAdmin from './pages/AdminDashboard';
import DashboardUser from './pages/UserDashboard';
import DashboardOwner from './pages/OwnerDashboard';
import StoresPage from './pages/StoresPage';
import AddStorePage from './pages/AddStorePage';
import AddUserPage from './pages/AddUserPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard/admin" element={<DashboardAdmin />} />
        <Route path="/dashboard/user" element={<DashboardUser />} />
        <Route path="/dashboard/owner" element={<DashboardOwner />} />
        <Route path="/stores" element={<StoresPage />} />
        <Route path="/add-store" element={<AddStorePage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
