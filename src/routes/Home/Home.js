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

  const [selectedAh, setSelectedAh] = useState(null);

  const handleInputSelection = (ah) => {
    if (ah === null) setSelectedAh(null);
    else
      for (let anmeldung of angemeldet.data) {
        if (anmeldung.id === ah.id)
          return setSelectedAh({
            data: ah,
            anmeldung: { date: anmeldung.date, start: anmeldung.start },
          });
      }
    setSelectedAh({ data: ah, anmeldung: null });
  };

  const handleListSelection = (anmeldung) => {
    // wenn ah die ausgewählte ist -> abwählen
    if (anmeldung.ahid === selectedAh?.data?.id) return setSelectedAh(null);
    for (let ah of aushilfen.data.all) {
      if (ah.id === anmeldung.ahid)
        return setSelectedAh({
          data: ah,
          anmeldung: { date: anmeldung.date, start: anmeldung.start },
        });
    }
  };

  return (
    <Box className={common.lgContainer}>
      <AControl
        aushilfen={aushilfen}
        selected={[selectedAh, setSelectedAh]}
        handleSelection={handleInputSelection}
      />
      <AngemeldetList
        selectedAh={selectedAh}
        handleSelection={handleListSelection}
        angemeldet={angemeldet}
      />
    </Box>
  );
}

export default Home;

// angemeldet-objekt,id1123 = true, dann erscheint der abmeldenbutton

// context mit:
// selectedAh
