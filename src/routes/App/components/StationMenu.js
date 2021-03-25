import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import { IoMapOutline } from 'react-icons/io5';
import fetchData from '../../../util/fetchData';
import { useQueryClient } from 'react-query';
import useToastContext from '../../../context/ToastContext';

function StationMenu({ stations }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [noMenu, setNoMenu] = useState(false);
  const { addError } = useToastContext();

  const queryClient = useQueryClient();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = async (num) => {
    try {
      setNoMenu(true);
      setAnchorEl(null);
      const isUpdated = await fetchData(
        'api/session',
        {
          station: num,
        },
        'put'
      );
      // erst wenn update erfolgreich war
      if (isUpdated) queryClient.invalidateQueries('session');
    } catch (err) {
      addError(err);
    }
  };

  return !stations.length > 0 ? null : (
    <div>
      <Box ml={2}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="stat-menu"
          aria-haspopup={true}
          onClick={noMenu ? null : handleClick}
        >
          <IoMapOutline />
        </IconButton>
      </Box>

      <Menu
        id="stat-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
      >
        {stations.map(({ number, name }) => {
          return (
            <MenuItem
              key={number}
              onClick={() => {
                handleSelection(number);
              }}
            >
              {name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

StationMenu.propTypes = {
  stations: PropTypes.array,
};

export default StationMenu;
