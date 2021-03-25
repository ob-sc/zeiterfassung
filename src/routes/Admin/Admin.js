import { Box } from '@material-ui/core';
import useCommonStyles from '../../styles/common';
import BorderContainer from '../../components/BorderContainer';

function Admin() {
  const common = useCommonStyles();

  return (
    <Box className={common.centerTransform}>
      <BorderContainer m={2} p={10}>
        <Box textAlign="center">
          <h1>Admin</h1>
        </Box>
      </BorderContainer>
    </Box>
  );
}

export default Admin;
