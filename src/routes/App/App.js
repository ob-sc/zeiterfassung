import { Router } from '@reach/router';
import { Box } from '@material-ui/core';
import useStyles from './AppStyles';
import useMobile from './hooks/useMobile';
import { AuthContextProvider } from '../../context/AuthContext';
import NotFound from '../NotFound/NotFound';
import Home from '../Home/Home';
import Admin from '../Admin/Admin';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import NavBar from './components/NavBar';
import Toast from './components/Toast';
import AuthRoute from './components/AuthRoute';

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
