import PropTypes from 'prop-types';
import { Box, LinearProgress, makeStyles } from '@material-ui/core';

// todo colors theme primar main + light, warn und error?
const barColors = {
  bar: '#6e6e6e',
  neutral: '#c0c0c0',
  warn: '#ffed00',
  critical: '#f44336',
};

const useStyles = makeStyles({
  colorPrimary: (props) => ({ backgroundColor: props.colorPrimary }),
  barColorPrimary: { backgroundColor: barColors.bar },
});

function MaxProgress({ progress }) {
  const color = progress > 80 ? barColors.warn : barColors.neutral;

  // if progress so, dass die AH nicht mehr 8 Stunden arbeiten kann ? critical

  const { colorPrimary, barColorPrimary } = useStyles({
    colorPrimary: color,
  });

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        classes={{ colorPrimary, barColorPrimary }}
        value={progress}
      />
      <Box>{}</Box>
    </Box>
  );
}

MaxProgress.propTypes = { progress: PropTypes.number };

export default MaxProgress;
