import { Box } from '@material-ui/core';
import useHomeContext from '../../../context/HomeContext';

function ADetails() {
  const { state } = useHomeContext();

  return (
    <Box>
      <p>text hier</p>
      <p>hier ist text</p>
    </Box>
  );
}

export default ADetails;
