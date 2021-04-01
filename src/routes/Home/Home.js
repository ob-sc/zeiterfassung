import { Box } from '@material-ui/core';
import useHomeContext from '../../context/HomeContext';
import useCommonStyles from '../../styles/common';
import useAuthContext from '../../context/AuthContext';
import useAngemeldet from '../../api/useAngemeldet';
import useAushilfen from '../../api/useAushilfen';
import AList from './components/AList';
import Control from './components/Control';
import Details from './components/Details';
import MaxProgress from './components/MaxProgress';

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
    if (anmeldung.ahid === state.selected?.data?.id)
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
    <Box className={common.mdContainer}>
      <Control aushilfen={aushilfen} handleSelection={handleInputSelection} />
      <MaxProgress />
      <Box className={common.flexRowCenterStartWrap}>
        <AList handleSelection={handleListSelection} angemeldet={angemeldet} />
        <Details />
      </Box>
    </Box>
  );
}

export default Home;
