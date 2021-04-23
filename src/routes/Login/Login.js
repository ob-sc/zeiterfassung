import { Link } from '@reach/router';
import { Login as LoginForm } from '@ob-sc/zeiterfassung.forms.login';
import useCommonStyles from '../../styles/common';
import { useCreateSession } from '../../api/useSession';

function Login() {
  const common = useCommonStyles();
  const login = useCreateSession();
  const link = <Link to="/sign-up">Account erstellen</Link>;

  return (
    <div className={common.centerTransform}>
      <LoginForm mutation={login} signUpLink={link} />
    </div>
  );
}

export default Login;
