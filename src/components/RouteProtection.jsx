import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser  } = useAuth();
  console.log("Current user in ProtectedRoute:", currentUser);


  if (!currentUser ) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/login"/>;
  }

  return children;
};

export default ProtectedRoute;