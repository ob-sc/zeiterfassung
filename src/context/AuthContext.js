import React, { useContext } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { Redirect } from '@reach/router';
import { CircularProgress } from '@material-ui/core';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import useCommonStyles from '../styles/common';

/*
 * AuthContextProvider prüft, ob es eine session gibt
 * nein = children werden nicht gerendered (auch nicht 404)
 * es gibt einen redirect auf login
 * login und sign-up sind die einzigen routen im router
 */

const context = React.createContext();
const useAuthContext = () => useContext(context);

export const AuthContextProvider = ({ children }) => {
  const common = useCommonStyles();
  const logout = useLogout(true);
  const { isLoading, isError, error, isLoggedIn, ...session } = useAuth();

  useIdleTimer({
    timeout: 1000 * 60 * 5,
    onIdle: () => {
      logout();
    },
  });

  if (isLoading)
    return (
      // mit wrapper damit spinner zentriert ist
      <div className={common.centerTransform}>
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
