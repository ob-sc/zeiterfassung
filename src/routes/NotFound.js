import PropTypes from 'prop-types';
import { Box, Paper } from '@material-ui/core';
import { useLocation } from '@reach/router';

function NotFound() {
  const { pathname } = useLocation();
  const isApiRoute = pathname.substring(0, 4) === '/api';
  return (
    <Paper>
      <Box m={2} p={8} textAlign="center">
        {isApiRoute ? (
          <>
            <h1>Kein Zugriff</h1>
            <Box fontSize="90px">🔒</Box>
          </>
        ) : (
          <>
            <h1>Seite nicht gefunden</h1>
            <Box fontSize="90px">🔎</Box>
          </>
        )}
      </Box>
    </Paper>
  );
}

NotFound.propTypes = { restricted: PropTypes.bool };

export default NotFound;
