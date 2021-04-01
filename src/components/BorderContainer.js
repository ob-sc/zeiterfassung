import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '1px solid',
    borderColor: theme.palette.primary.light,
    borderRadius: 5,
  },
}));

function BorderContainer({ border, classArray, children, ...rest }) {
  const { root } = useStyles();

  return (
    <Box {...rest} clone className={clsx(border && root, classArray)}>
      {children}
    </Box>
  );
}

BorderContainer.propTypes = {
  border: PropTypes.bool,
  classArray: PropTypes.array,
};

export default BorderContainer;
