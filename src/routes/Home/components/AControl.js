import { FiChevronRight } from 'react-icons/fi';
import { Box, IconButton } from '@material-ui/core';
import useCommonStyles from '../../../styles/common';
import AhAutocomplete from '../../../components/AhAutocomplete';
import TimeInput from '../../../components/TimeInput';

function AControl({ aushilfen, state, handleSelection, error }) {
  const common = useCommonStyles();

  return (
    <Box className={common.flexRowCenterStartWrap}>
      <Box m={1} p={1} className={common.mdItem}>
        <AhAutocomplete
          aushilfen={aushilfen}
          state={state}
          handleSelection={handleSelection}
          error={error}
        />
      </Box>
      <Box m={1} p={1}>
        <TimeInput label="Beginn" />
      </Box>
      <Box m={1} p={1}>
        <IconButton
          edge="start"
          color="inherit"
          className={common.iconButton}
          // onClick={handleClick}
        >
          <FiChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
}

export default AControl;
