import useAuthContext from '../../context/AuthContext';
import useHomeContext from '../../context/HomeContext';

const useHome = ({ aushilfen, angemeldet }) => {
  const { station } = useAuthContext();
  const { state, updateSelected, updateCheckAll } = useHomeContext();

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

  return { handleInputSelection, handleListSelection };
};

export default useHome;
