import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authChecking, authChecked } = useSelector((state) => state.auth);

  if (authChecking && !authChecked) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 text-center text-gray-700">
        Checking your session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
