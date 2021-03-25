import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Box, IconButton } from '@material-ui/core';

import useStyles from './HomeStyles';
import useCommonStyles from '../../styles/common';
import useAllAushilfen from '../../hooks/useAllAushilfen';
import AhAutocomplete from '../../components/AhAutocomplete';
import TimeInput from '../../components/TimeInput';
import AngemeldetList from './components/AngemeldetList';

function Home() {
  const classes = useStyles();
  const common = useCommonStyles();

  const aushilfen = useAllAushilfen(); // { station, all, isLoading, error }
  const [selected, setSelected] = useState(null);

  console.log(selected);

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
      <AngemeldetList angemeldet={[{}]} />
    </Box>
  );
}

export default Home;

// angemeldet-objekt,id1123 = true, dann erscheint der abmeldenbutton

// <Chip variant="outlined" color="primary" onDelete={handleDelete} avatar={<Avatar>F</Avatar>} />
