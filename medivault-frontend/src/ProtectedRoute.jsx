import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL || "admin@medivault.com";

  // If not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Special case for admin (by email)
  if (allowedRoles.includes("admin") && userData.email === ADMIN_EMAIL) {
    return children;
  }

  // If role not available or not allowed
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // Access granted for normal roles
  return children;
};

export default ProtectedRoute;