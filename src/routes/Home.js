import { useState } from 'react';
import { Box } from '@material-ui/core';

import useStyles from '../styles/routes/HomeStyles';
import useAllAushilfen from '../hooks/useAllAushilfen';
import AhAutocomplete from '../components/AhAutocomplete';
import PaperContainer from '../components/PaperContainer';

function Home() {
  const classes = useStyles();

  const aushilfen = useAllAushilfen(); // { station, all, isLoading }
  const [selected, setSelected] = useState(null);
  console.log(selected);

  return (
    <Box className={classes.flexCenterRoot}>
      <PaperContainer m={2} p={2}>
        <AhAutocomplete
          aushilfen={aushilfen}
          selected={selected}
          setSelected={setSelected}
        />
      </PaperContainer>
    </Box>
  );
}

export default Home;
