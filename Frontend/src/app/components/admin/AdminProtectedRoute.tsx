import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAdminToken } from '../../../api/adminApi';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const token = getAdminToken();

  if (!token) {
    return <Navigate to="/pranav-admin/login" replace />;
  }

  return <>{children}</>;
}
