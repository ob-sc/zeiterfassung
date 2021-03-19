import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import useCommonStyles from '../styles/common';
import PaperContainer from '../components/PaperContainer';
import magnifyingGlass from '../images/magnifying-glass.svg';

function NotFound() {
  const common = useCommonStyles();

  return (
    <Box className={common.flexCenterRoot}>
      <PaperContainer m={2} p={10}>
        <Box textAlign="center">
          <h1>Seite nicht gefunden</h1>
          <img src={magnifyingGlass} alt="lupe" width="150px" />
        </Box>
      </PaperContainer>
    </Box>
  );
}

NotFound.propTypes = { restricted: PropTypes.bool };

export default NotFound;

// /api sollte wegen nginx konfig nie kommen
