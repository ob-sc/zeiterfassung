import { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { Box, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { FiMenu } from 'react-icons/fi';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useDeleteSession } from '../../../api/useSession';

const useStyles = makeStyles({
  menuIcon: {
    '& svg': {
      fontSize: 30,
    },
  },
});

function NavMenu({ routes, mobile }) {
  const { menuIcon } = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [noLogout, setNoLogout] = useState(false);

  const logout = useDeleteSession();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (route) => {
    handleClose();
    navigate(route.href);
  };

  const handleLogout = async () => {
    setNoLogout(true);
    setAnchorEl(null);
    logout.mutate();
  };

  return (
    <div>
      <Box ml={2}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="nav-menu"
          aria-haspopup={true}
          onClick={handleClick}
          className={menuIcon}
        >
          {mobile ? <FiMenu /> : <IoPersonCircleOutline />}
        </IconButton>
      </Box>

      <Menu
        id="nav-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
      >
        {mobile &&
          routes.length > 0 &&
          routes.map(({ label, route }) => {
            return (
              <MenuItem
                key={label}
                onClick={() => {
                  handleNavigation(route);
                }}
              >
                {label}
              </MenuItem>
            );
          })}
        <MenuItem onClick={handleClose}>Mein Account</MenuItem>
        <MenuItem disabled={noLogout} onClick={handleLogout}>
          Abmelden
        </MenuItem>
      </Menu>
    </div>
  );
}

NavMenu.propTypes = {
  routes: PropTypes.array,
  mobile: PropTypes.bool,
};

export default NavMenu;
