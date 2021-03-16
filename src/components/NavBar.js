import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { AppBar, Box, Button, Toolbar } from '@material-ui/core';
import useStyles from '../styles/components/NavBarStyles';
import logo from '../images/logo.png';
import useAuth from '../hooks/useAuth';
import NavMenu from './NavMenu';
import StationMenu from './StationMenu';
import CurrStation from './CurrStation';

function NavBar({ mobile }) {
  const classes = useStyles();
  const auth = useAuth();

  const isLoggedIn = auth?.isLoggedIn === true; // nur true wenn status != loading
  const hasStations = auth?.stations?.length > 1;
  const showNavButtons = !mobile && isLoggedIn && hasStations; // nur desktop, daten geladen & nicht leer

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            pt={2}
          >
            <Link to="/">
              <img src={logo} alt="logo" height="45px" />
            </Link>
            <Box display="flex">
              {showNavButtons &&
                auth.routes.map(({ label, route }) => {
                  return (
                    <Button
                      className={classes.navButton}
                      key={label}
                      color="inherit"
                      variant="text"
                      to={route.href}
                      component={Link}
                    >
                      {label}
                    </Button>
                  );
                })}
              {isLoggedIn && (
                <>
                  {hasStations && <StationMenu stations={auth.stations} />}
                  <NavMenu routes={auth.routes} mobile={mobile} />
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {hasStations && <CurrStation station={auth.station} />}
    </>
  );
}

NavBar.propTypes = { mobile: PropTypes.bool };

export default NavBar;
