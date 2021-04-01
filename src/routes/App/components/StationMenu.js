import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { IoMapOutline } from 'react-icons/io5';
import useCommonStyles from '../../../styles/common';
import useToastContext from '../../../context/ToastContext';
import { tripDigitStation } from '../../../util/stringUtil';
import { useUpdateSession } from '../../../api/useSession';

const useStyles = makeStyles({
  stationIcon: {
    '& svg': {
      fontSize: 24,
    },
  },
  stationNum: { fontSize: 14, marginTop: -14 },
});

function StationMenu({ stations, station }) {
  const { stationIcon, stationNum } = useStyles();
  const common = useCommonStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const { addError } = useToastContext();

  const updateStation = useUpdateSession();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (station) => {
    try {
      setAnchorEl(null);
      updateStation.mutate({ station });
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
          disabled={updateStation.isLoading}
          className={stationIcon}
        >
          <IoMapOutline />
        </IconButton>
        <div className={stationNum}>{tripDigitStation(station)}</div>
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
