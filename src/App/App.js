import { Router } from '@reach/router';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useApp from './useApp';
import { AuthContextProvider } from '../context/AuthContext';
import { HomeContextProvider } from '../context/HomeContext';
import useAuth from '../hooks/useAuth';
import NotFound from '../routes/NotFound/NotFound';
import Home from '../routes/Home/Home';
import Admin from '../routes/Admin/Admin';
import Login from '../routes/Login/Login';
import SignUp from '../routes/SignUp/SignUp';
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
  const { root } = useStyles();
  const auth = useAuth();
  const mobile = useApp();

  return (
    <Box className={root}>
      <NavBar mobile={mobile} auth={auth} />
      <Toast mobile={mobile} />
      <Router>
        <AuthContextProvider path="/" auth={auth}>
          <HomeContextProvider path="/">
            <Home path="/" />
            <NotFound default />
          </HomeContextProvider>
          <AuthRoute path="admin" component={<Admin />} />
        </AuthContextProvider>
        <Login path="login" />
        <SignUp path="sign-up" />
      </Router>
    </Box>
  );
}

export default App;
