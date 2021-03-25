import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: '1rem',
  },
};

const useStyles = makeStyles(styles);

function CurrStation({ station }) {
  const classes = useStyles();

  return <div className={classes.root}>Station: {station}</div>;
}

CurrStation.propTypes = { station: PropTypes.number };

export default CurrStation;
