import { Redirect } from '@reach/router';
import usePathAuth from '../hooks/usePathAuth';

function AuthRoute({ path, component }) {
  const auth = usePathAuth(path);

  return auth === true ? component : <Redirect to="/" noThrow />;
}

export default AuthRoute;
