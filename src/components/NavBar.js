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
      <AppBar position="static" color="transparent" elevation={0}>
        <Box
          display="flex"
          flexDirection="row-reverse"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          py={2}
          clone
        >
          <Toolbar>
            <Box display="flex">
              {showNavButtons &&
                auth.routes.map(({ label, route }) => {
                  return (
                    <Button
                      className={classes.navButton}
                      key={label}
                      color="inherit"
                      to={route.href}
                      variant="text"
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

            {!mobile && (
              <Link to="/">
                <img src={logo} alt="logo" height="45px" />
              </Link>
            )}
          </Toolbar>
        </Box>
      </AppBar>
      {
        hasStations && (
          <CurrStation station={auth.station} />
        ) /* todo schöner machen, badge bei stationmenu?? */
      }
    </>
  );
}

NavBar.propTypes = { mobile: PropTypes.bool };

export default NavBar;
