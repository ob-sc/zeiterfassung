import { useEffect } from 'react';
import { Redirect } from '@reach/router';
import { CircularProgress } from '@material-ui/core';
import useToastContext from '../context/ToastContext';
import useAuth from '../hooks/useAuth';

function AuthWrapper({ children }) {
  const { error, isError, isLoading, isLoggedIn } = useAuth();
  const { addError } = useToastContext();

  useEffect(() => {
    if (isError) addError(error);
  });

  if (isLoading) return <CircularProgress size={70} />;
  if (isError) {
    // todo timeout ist hacky lösung für fehler
    // Cannot update a component (`ToastContextProvider`) while rendering a different component (`AuthWrapper`).
    return <Redirect to="/login" noThrow />;
  }

  return isLoggedIn === true ? children : <Redirect to="/login" noThrow />;
}

export default AuthWrapper;
