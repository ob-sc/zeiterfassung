import { useEffect, useState } from 'react';
import { Box, LinearProgress, makeStyles } from '@material-ui/core';
import useToastContext from '../../../context/ToastContext';
import { useAhZeiten } from '../../../api/useZeiten';
import useHomeContext from '../../../context/HomeContext';
import { fetchData } from '../../../util/api';

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

function MaxProgress() {
  const [zeiten, setZeiten] = useState([]);
  const { addError } = useToastContext();
  const { state } = useHomeContext();
  const progress = 20;

  console.log(zeiten);

  const color = progress > 80 ? barColors.warn : barColors.neutral;

  useEffect(() => {
    const fetchZeiten = async (ahid) => {
      console.log(ahid);
      try {
        if (ahid !== undefined) {
          const data = fetchData(`/zeiten/aushilfen/${ahid}`);
          setZeiten(data);
        }
      } catch (err) {
        addError(err);
      }
    };
    fetchZeiten(state.selected?.data?.id);
  }, [state]);

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

export default MaxProgress;
