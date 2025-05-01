import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export function ProtectedRoute({ children, ...props }) {
  const { user } = useContext(AuthContext);
  if (user === null) return <Redirect to="/login" />;
  return <Route {...props}>{children}</Route>;
}