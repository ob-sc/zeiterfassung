import { Box } from '@material-ui/core';
import useHomeContext from '../../context/HomeContext';
import useCommonStyles from '../../styles/common';
import useAuthContext from '../../context/AuthContext';
import useAngemeldet from '../../api/useAngemeldet';
import useAushilfen from '../../api/useAushilfen';
import AngemeldetList from './components/AngemeldetList';
import AControl from './components/AControl';

function Home() {
  const common = useCommonStyles();

  const { station } = useAuthContext();
  const { state, updateSelected, updateCheckAll } = useHomeContext();

  const aushilfen = useAushilfen();
  const angemeldet = useAngemeldet();

  const handleInputSelection = (ah) => {
    if (ah === null) updateSelected(null);
    else {
      const sameStation = ah?.station === station;
      for (const anmeldung of angemeldet.data) {
        if (anmeldung.ahid === ah.id) {
          return updateSelected({
            sameStation,
            data: ah,
            anmeldung: { date: anmeldung.date, start: anmeldung.start },
          });
        }
      }
      updateSelected({
        sameStation,
        data: ah,
        anmeldung: null,
      });
    }
  };

  const handleListSelection = (anmeldung) => {
    // wenn ah die ausgewählte ist -> abwählen
    if (anmeldung.ahid === state?.selected?.data?.id)
      return updateSelected(null);
    for (const ah of aushilfen.data.all) {
      if (ah.id === anmeldung.ahid) {
        if (ah?.station !== undefined && ah?.station !== station)
          updateCheckAll(true);

        return updateSelected({
          sameStation: ah?.station === station,
          data: ah,
          anmeldung: { date: anmeldung.date, start: anmeldung.start },
        });
      }
    }
  };

  return (
    <Box className={common.lgContainer}>
      <AControl aushilfen={aushilfen} handleSelection={handleInputSelection} />
      <AngemeldetList
        handleSelection={handleListSelection}
        angemeldet={angemeldet}
      />
    </Box>
  );
}

export default Home;
