// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If not logged in
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // If role not allowed
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // Access granted
  return children;
};

export default ProtectedRoute;
