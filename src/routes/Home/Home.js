import { useState } from 'react';
import { Box } from '@material-ui/core';
import useCommonStyles from '../../styles/common';
import useAngemeldet from '../../api/useAngemeldet';
import useAushilfen from '../../api/useAushilfen';
import AngemeldetList from './components/AngemeldetList';
import AControl from './components/AControl';

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
      <AControl
        aushilfen={aushilfen}
        state={[aushilfe, setAushilfe]}
        handleSelection={handleInputSelection}
        error={aushilfen.error}
      />
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
