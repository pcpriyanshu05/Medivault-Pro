import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

// Not logged in? Redirect to login
if (!token) {
return <Navigate to="/login" replace />;
}

// Logged in but not allowed? Redirect to home or unauthorized page
if (!allowedRoles.includes(role)) {
return <Navigate to="/" replace />;
}

// All good ✅
return children;
};

export default ProtectedRoute;