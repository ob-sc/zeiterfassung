import { useState } from 'react';
import { Box } from '@material-ui/core';

import useCommonStyles from '../styles/common';
import useStyles from '../styles/routes/HomeStyles';
import useAllAushilfen from '../hooks/useAllAushilfen';
import AhAutocomplete from '../components/AhAutocomplete';
import TimeInput from '../components/TimeInput';

function Home() {
  const classes = useStyles();
  const common = useCommonStyles();

  const aushilfen = useAllAushilfen(); // { station, all, isLoading, error }
  const [selected, setSelected] = useState(null);

  return (
    <Box className={common.lgContainer}>
      <Box className={common.flexRowCenter}>
        <Box m={1} p={1} className={common.input}>
          <AhAutocomplete
            aushilfen={aushilfen}
            selected={selected}
            setSelected={setSelected}
            error={aushilfen.error}
          />
        </Box>
        <Box m={1} p={1}>
          <TimeInput label="Zeit" />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
