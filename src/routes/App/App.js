import { Router } from '@reach/router';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useApp from './useApp';
import { AuthContextProvider } from '../../context/AuthContext';
import { HomeContextProvider } from '../../context/HomeContext';
import useAuth from '../../hooks/useAuth';
import NotFound from '../NotFound/NotFound';
import Home from '../Home/Home';
import Admin from '../Admin/Admin';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import NavBar from './components/NavBar';
import Toast from './components/Toast';
import AuthRoute from './components/AuthRoute';

const useStyles = makeStyles({
  root: {
    // minHeight: '100vh',
    '& a': {
      textDecoration: 'none',
    },
  },
});

function App() {
  const classes = useStyles();
  const auth = useAuth();
  const mobile = useApp();

  return (
    <Box className={classes.root}>
      <NavBar mobile={mobile} auth={auth} />
      <Toast mobile={mobile} />
      <Router>
        <AuthContextProvider path="/" auth={auth}>
          <HomeContextProvider path="/">
            <Home path="/" />
          </HomeContextProvider>
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
