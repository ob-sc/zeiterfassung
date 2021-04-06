import { Box, LinearProgress, makeStyles } from '@material-ui/core';
import useHomeContext from '../../../context/HomeContext';
import { toFixedTwo, formatMinutes } from '../../../util/stringUtil';

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

  if (state.max !== null && sameAh) {
    const sumMax = state.max.sum;
    // studenten dürfen 20 std / woche arbeiten
    // bei semesterferien 40
    const hours = 20;
    // progress = von 0 bis 100, sumMax mit Gehalt in cent, deshalb nicht * 100
    progress = isStudent
      ? Math.min((sumMax / (hours * 60)) * 100, 100)
      : Math.min(sumMax / maxNumber, 100);

    progressDetails = isStudent
      ? `${toFixedTwo(sumMax / 60)} von ${hours} Stunden (${Math.round(progress)} %)`
      : `${toFixedTwo(sumMax / 100)} von ${maxNumber} € (${Math.round(progress)} %)`;
    // todo append noch x stunden oder € bis abmeldung wenn critical

    if (isStudent && progress > 80) {
      const restMin = hours * 60 - sumMax;
      const restZuStunden = formatMinutes(restMin, true);
      const stdString =
        restZuStunden.h > 0 ? `${restZuStunden.h} Stunde${restZuStunden.h > 1 ? 'n' : ''} ` : '';

      const restString =
        restMin < 0 ? ' - Limit überschritten' : ` - noch ${stdString}${restZuStunden.m} Minuten`;

      progressDetails += restString;
    }
  }

  const isWarning = progress > 80;
  const isCritical = progress > 90;

  let color = isWarning ? barColors.warn : barColors.neutral;
  if (isCritical) color = barColors.critical;

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
      <Box className={isCritical ? criticalColor : null} height={20}>
        {progress > 0 && sameAh ? progressDetails : null}
      </Box>
    </Box>
  );
}

export default MaxProgress;
