import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import useCommonStyles from '../styles/common';
import BorderContainer from '../components/BorderContainer';
import magnifyingGlass from '../images/magnifying-glass.svg';

function NotFound() {
  const common = useCommonStyles();

  return (
    <Box className={common.centerTransform}>
      <BorderContainer m={2} p={10}>
        <Box textAlign="center">
          <h1>Seite nicht gefunden</h1>
          <img src={magnifyingGlass} alt="lupe" width="150px" />
        </Box>
      </BorderContainer>
    </Box>
  );
}

NotFound.propTypes = { restricted: PropTypes.bool };

export default NotFound;

// /api sollte wegen nginx konfig nie kommen
