import React, { useContext, useEffect } from 'react';
import { Redirect } from '@reach/router';
import { CircularProgress } from '@material-ui/core';
import useToastContext from './ToastContext';
import useAuth from '../hooks/useAuth';
import useCommonStyles from '../styles/common';

const context = React.createContext();
const useAuthContext = () => useContext(context);

export const AuthContextProvider = ({ children }) => {
  const common = useCommonStyles();
  const { addError } = useToastContext();
  const { error, isError, isLoading, isLoggedIn, ...session } = useAuth();

  useEffect(() => {
    if (isError) addError(error);
  });

  if (isLoading)
    return (
      // mit wrapper damit spinner zentriert ist
      <div className={common.flexCenterRoot}>
        <CircularProgress size={70} />
      </div>
    );

  if (isError) {
    return <Redirect to="/login" noThrow />;
  }

  return isLoggedIn === true ? (
    <context.Provider value={session}>{children}</context.Provider>
  ) : (
    <Redirect to="/login" noThrow />
  );
};

export default useAuthContext;
