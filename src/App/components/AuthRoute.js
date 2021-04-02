import { Redirect } from '@reach/router';
import useAuthContext from '../../context/AuthContext';

function AuthRoute({ path, component }) {
  const { routeAuth } = useAuthContext();
  // zb routeAuth.admin (true oder undefined)
  const auth = routeAuth[path];

  return auth === true ? component : <Redirect to="/" noThrow />;
}

export default AuthRoute;
