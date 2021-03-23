import { Box } from '@material-ui/core';
import useCommonStyles from '../styles/common';
import PaperContainer from '../components/PaperContainer';

function Admin() {
  const common = useCommonStyles();

  return (
    <Box className={common.flexCenterRoot}>
      <PaperContainer m={2} p={10}>
        <Box textAlign="center">
          <h1>Admin</h1>
        </Box>
      </PaperContainer>
    </Box>
  );
}

export default Admin;
