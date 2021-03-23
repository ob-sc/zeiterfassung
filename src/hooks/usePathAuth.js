import useAuthContext from '../context/AuthContext';

const usePathAuth = (path) => {
  const { routeAuth } = useAuthContext();
  return !!routeAuth[path];
};

export default usePathAuth;
