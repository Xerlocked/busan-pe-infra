import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/lib/api';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
