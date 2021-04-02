import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Box, Button, Toolbar } from '@material-ui/core';
import logo from '../../images/logo.png';
import NavMenu from './NavMenu';
import StationMenu from './StationMenu';
import { layout } from '../../styles/common';

const styles = {
  ...layout,
  navButton: {
    width: 96,
  },
};

const useStyles = makeStyles(styles);

function NavBar({ mobile, auth }) {
  const { flexRowCenter, navButton } = useStyles();

  const isLoggedIn = auth?.isLoggedIn === true; // nur true wenn status != loading
  const hasStations = auth?.stations?.length > 1;
  const showNavButtons = !mobile && isLoggedIn && hasStations; // nur desktop, daten geladen & nicht leer

  return (
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
          <Box className={flexRowCenter}>
            {showNavButtons &&
              auth.routes.map(({ label, route }) => {
                return (
                  <Button
                    className={navButton}
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
                {hasStations && (
                  <StationMenu
                    stations={auth.stations}
                    station={auth.station}
                  />
                )}
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
  );
}

NavBar.propTypes = {
  mobile: PropTypes.bool,
  auth: PropTypes.object.isRequired,
};

export default NavBar;
