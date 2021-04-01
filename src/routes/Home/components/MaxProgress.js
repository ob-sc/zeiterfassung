import { LinearProgress } from '@material-ui/core';

function MaxProgress() {
  const progress = 10;
  return <LinearProgress variant="determinate" value={progress} />;
}

export default MaxProgress;
