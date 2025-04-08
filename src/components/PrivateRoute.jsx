import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children, allowedRoles }) {
  const location = useLocation();
  
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  
  const isLoggedIn = token && role;
  
  if (!isLoggedIn || !allowedRoles.includes(role)) {
    // Redirect them to the login page or unauthorized page
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
