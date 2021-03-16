import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { navigate } from '@reach/router';
import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { FiMenu } from 'react-icons/fi';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { deleteData } from '../util/fetchData';
import useToastContext from '../context/ToastContext';

// NavMenu ist ein User Menu für logout etc wenn desktop

function NavMenu({ routes, mobile }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [noLogout, setNoLogout] = useState(false);

  const { addError } = useToastContext();

  const queryClient = useQueryClient();

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
    try {
      const isLoggedOut = await deleteData('api/session');
      // erst wenn logout erfolgreich war
      if (isLoggedOut) {
        queryClient.invalidateQueries('session');
        navigate('/');
      }
    } catch (err) {
      addError(err);
    }
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
