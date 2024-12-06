

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const [{ user }] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { msg, redirect } });
    }
  }, [user, navigate, msg, redirect]);

  // Render children only if the user exists
  if (!user) {
    return null; // Or you can return a loading spinner if needed
  }

  return children;
};

export default ProtectedRoute;
