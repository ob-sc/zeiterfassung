import { useEffect } from 'react';
import { Redirect } from '@reach/router';
import { CircularProgress } from '@material-ui/core';
import useToastContext from '../context/ToastContext';
import useAuth from '../hooks/useAuth';
import useCommonStyles from '../styles/common';

function AuthWrapper({ children }) {
  const common = useCommonStyles();
  const { error, isError, isLoading, isLoggedIn } = useAuth();
  const { addError } = useToastContext();

  useEffect(() => {
    if (isError) addError(error);
  });

  if (isLoading)
    return (
      <div className={common.flexCenterRoot}>
        <CircularProgress size={70} />
      </div>
    );
  if (isError) {
    return <Redirect to="/login" noThrow />;
  }

  return isLoggedIn === true ? children : <Redirect to="/login" noThrow />;
}

export default AuthWrapper;
