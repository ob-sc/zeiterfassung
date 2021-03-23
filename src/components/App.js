import { Router } from '@reach/router';
import { Box } from '@material-ui/core';
import useStyles from '../styles/components/AppStyles';
import { AuthContextProvider } from '../context/AuthContext';
import useMobile from '../hooks/useMobile';
import NavBar from './NavBar';
import Toast from './Toast';
import NotFound from '../routes/NotFound';
import Home from '../routes/Home';
import Admin from '../routes/Admin';
import Login from '../routes/Login';
import SignUp from '../routes/SignUp';
import AuthRoute from './AuthRoute';

function App() {
  const classes = useStyles();
  const mobile = useMobile();

  return (
    <Box className={classes.root}>
      <NavBar mobile={mobile} />
      <Toast mobile={mobile} />
      <Router>
        <AuthContextProvider path="/">
          <Home path="/" />
          <AuthRoute path="admin" component={<Admin />} />
          <NotFound default />
        </AuthContextProvider>
        <Login path="login" />
        <SignUp path="sign-up" />
      </Router>
    </Box>
  );
}

export default App;
