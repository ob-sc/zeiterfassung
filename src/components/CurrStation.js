import PropTypes from 'prop-types';
import useStyles from '../styles/components/CurrStationStyles';

function CurrStation({ station }) {
  const classes = useStyles();

  return <div className={classes.root}>Station: {station}</div>;
}

CurrStation.propTypes = { station: PropTypes.number };

export default CurrStation;
