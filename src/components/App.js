import { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import { Box } from '@material-ui/core';
import useStyles from '../styles/components/AppStyles';
import { ToastContextProvider } from '../context/ToastContext';
import NavBar from './NavBar';
import AuthWrapper from './AuthWrapper';
import Toast from './Toast';
import NotFound from '../routes/NotFound';
import Home from '../routes/Home';
import Admin from '../routes/Admin';
import Login from '../routes/Login';
import SignUp from '../routes/SignUp';

function App() {
  const classes = useStyles();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1024 ? setMobile(true) : setMobile(false);
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  });
  // }, []);

  return (
    <ToastContextProvider>
      <Box className={classes.root}>
        <NavBar mobile={mobile} />
        <Toast mobile={mobile} />
        <Router>
          <AuthWrapper path="/">
            <Home path="/" />
            <NotFound default />
          </AuthWrapper>
          <AuthWrapper path="admin">
            <Admin path="/" />
          </AuthWrapper>
          <Login path="login" />
          <SignUp path="sign-up" />
        </Router>
      </Box>
    </ToastContextProvider>
  );
}

export default App;

// innerhalb authwrapper kommt <Account /> oder so, verlinkt über navbar
// der hat keine access beschränkung
// deshalb kriegt status null nur die seite settings wenn eingeloggt
