import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { Box, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { IoMapOutline } from 'react-icons/io5';
import useCommonStyles from '../../../styles/common';
import fetchData from '../../../util/fetchData';
import useToastContext from '../../../context/ToastContext';
import { tripDigitStation } from '../../../util/stringUtil';

const useStyles = makeStyles({
  stationIcon: {
    '& svg': {
      fontSize: 24,
    },
  },
  stationNum: { fontSize: 14, marginTop: -14 },
});

function StationMenu({ stations, station }) {
  const classes = useStyles();
  const common = useCommonStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [disabled, setDisabled] = useState(false);
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
      setDisabled(true);
      setAnchorEl(null);
      const isUpdated = await fetchData('api/session', 'put', { station: num });
      // erst wenn update erfolgreich war
      if (isUpdated) queryClient.invalidateQueries('session');
      setDisabled(false);
    } catch (err) {
      addError(err);
    }
  };

  return !stations.length > 0 ? null : (
    <div>
      <Box ml={2} className={common.flexColumnCenterStart}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="stat-menu"
          aria-haspopup={true}
          onClick={handleClick}
          disabled={disabled}
          className={classes.stationIcon}
        >
          <IoMapOutline />
        </IconButton>
        <div className={classes.stationNum}>{tripDigitStation(station)}</div>
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
  station: PropTypes.number,
};

export default StationMenu;
