import { Box, LinearProgress, makeStyles } from '@material-ui/core';
import useHomeContext from '../../../context/HomeContext';
import { toFixedTwo } from '../../../util/stringUtil';

// todo colors theme primar main + light, warn und error?
const barColors = {
  neutral: '#c0c0c0',
  warn: '#ffed00',
  critical: '#f44336',
};

const useStyles = makeStyles((theme) => ({
  colorPrimary: (props) => ({ backgroundColor: props.colorPrimary }),
  barColorPrimary: { backgroundColor: theme.palette.secondary.main },
  criticalColor: { color: barColors.critical },
}));

// automatische abmeldung ist doof, weil der disponent dann nicht checkt was passiert ist
// und die aushilfe mehr arbeitet für evtl weniger gehalt

function MaxProgress() {
  const { state } = useHomeContext();
  const status = state.selected?.data?.status;
  const maxNumber = Number(status);
  const isStudent = status?.toLowerCase() === 'student';

  const sameAh = state.selected?.data?.id === state.max?.id;

  let progress = 0;
  let progressDetails = '';
  console.log(state);

  if (state.max !== null && sameAh) {
    const sumMax = state.max.sum;
    // studenten dürfen 20 std / woche arbeiten
    // bei semesterferien 40
    const stunden = 20;
    // progress = von 0 bis 100, sumMax mit Gehalt in cent, deshalb nicht * 100
    progress = isStudent
      ? Math.min((sumMax / (stunden * 60)) * 100, 100)
      : Math.min(sumMax / maxNumber, 100);

    progressDetails = isStudent
      ? `${toFixedTwo(sumMax / 60)} von ${stunden} Stunden (${toFixedTwo(progress)} %)`
      : `${toFixedTwo(sumMax / 100)} von ${maxNumber} € (${toFixedTwo(progress)} %)`;
    // todo append noch x stunden oder € bis abmeldung wenn critical
  }

  let color = progress > 70 ? barColors.warn : barColors.neutral;
  if (progress > 80) color = barColors.critical;

  const { colorPrimary, barColorPrimary, criticalColor } = useStyles({
    colorPrimary: color,
  });

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        classes={{ colorPrimary, barColorPrimary }}
        value={progress}
      />
      <Box className={progress > 80 ? criticalColor : null} height={20}>
        {progress > 0 && sameAh ? progressDetails : null}
      </Box>
    </Box>
  );
}

export default MaxProgress;
