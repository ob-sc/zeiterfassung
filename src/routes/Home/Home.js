import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Box, IconButton } from '@material-ui/core';
import useCommonStyles from '../../styles/common';
import useAngemeldet from '../../hooks/api/useAngemeldet';
import useAushilfen from '../../hooks/api/useAushilfen';
import AhAutocomplete from '../../components/AhAutocomplete';
import TimeInput from '../../components/TimeInput';
import AngemeldetList from './components/AngemeldetList';

function Home() {
  const common = useCommonStyles();

  const aushilfen = useAushilfen();
  const angemeldet = useAngemeldet();

  const [aushilfe, setAushilfe] = useState(null);

  const handleInputSelection = (ah) => {
    if (ah === null) setAushilfe(null);
    else
      for (let anmeldung of angemeldet.data) {
        if (anmeldung.id === ah.id)
          return setAushilfe({
            data: ah,
            anmeldung: { date: anmeldung.date, start: anmeldung.start },
          });
      }
    setAushilfe({ data: ah, anmeldung: null });
  };

  const handleListSelection = (anmeldung) => {
    // wenn ah die ausgewählte ist -> abwählen
    if (anmeldung.id === aushilfe?.data?.id) return setAushilfe(null);
    for (let ah of aushilfen.data.all) {
      if (ah.id === anmeldung.id)
        return setAushilfe({
          data: ah,
          anmeldung: { date: anmeldung.date, start: anmeldung.start },
        });
    }
  };

  return (
    <Box className={common.lgContainer}>
      <Box className={common.flexRowCenter}>
        <Box m={1} p={1} className={common.mdItem}>
          <AhAutocomplete
            aushilfen={aushilfen}
            state={[aushilfe, setAushilfe]}
            handleSelection={handleInputSelection}
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
      <AngemeldetList
        aushilfe={aushilfe}
        handleSelection={handleListSelection}
        angemeldet={angemeldet}
      />
    </Box>
  );
}

export default Home;

// angemeldet-objekt,id1123 = true, dann erscheint der abmeldenbutton

// <Chip variant="outlined" color="primary" onDelete={handleDelete} avatar={<Avatar>F</Avatar>} />
