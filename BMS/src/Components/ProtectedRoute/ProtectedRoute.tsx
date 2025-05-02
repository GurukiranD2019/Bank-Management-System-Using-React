// filepath: /Users/2174256/Documents/Projects/React Training Case Study/Bank-management-system/src/Components/ProtectedRoute/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/Login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
