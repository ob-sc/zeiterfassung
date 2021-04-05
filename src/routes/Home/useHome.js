import { useGetMax } from '../../api/useZeiten';
import useAuthContext from '../../context/AuthContext';
import useHomeContext from '../../context/HomeContext';
import calendar from '../../util/calendar';

const useHome = ({ aushilfen, angemeldet }) => {
  const { station } = useAuthContext();
  const { state, updateSelected, updateCheckAll } = useHomeContext();
  // getMax setzt state.max
  const getMax = useGetMax();

  const { month } = calendar();

  const handleInputSelection = (ah) => {
    if (ah === null) updateSelected(null);
    else {
      getMax.mutate({
        id: ah.id,
        status: ah.status,
        firstDayMonth: month.start.iso,
      });
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
    if (anmeldung.ahid === state.selected?.data?.id) return updateSelected(null);
    for (const ah of aushilfen.data.all) {
      if (ah.id === anmeldung.ahid) {
        if (ah?.station !== undefined && ah?.station !== station) updateCheckAll(true);

        getMax.mutate({
          id: ah.id,
          status: ah.status,
          firstDayMonth: month.start.iso,
        });

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
