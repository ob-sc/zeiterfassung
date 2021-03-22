import { useImmer } from 'use-immer';
import { useQuery } from 'react-query';
import useAuthContext from '../../context/AuthContext';
import fetchData from '../../util/fetchData';

function useAhAutocomplete() {
  const { station } = useAuthContext();
  const result = useQuery(
    'aushilfen',
    async () => await fetchData('/api/aushilfen')
  );
  const { status, data, isFetching } = result;

  const aushilfen = {
    station: [],
    all: [],
  };

  let isLoading = false;

  if (status === 'loading' || isFetching) isLoading = true;

  if (status === 'success') {
    for (let item of data) {
      if (item.station === station) aushilfen.station.push(item);
    }
    aushilfen.all = data;
    aushilfen.isSuccess = true;
  }

  const initState = {
    optionToggle: 'station',
    options: aushilfen.station,
    selectedAH: null,
  };

  const [ahState, updateAhState] = useImmer(initState);

  const optionsAll = ahState.optionToggle === 'all';
  // const optionsRegion = ahState.optionToggle === 'region';

  const toggleAll = () =>
    updateAhState((draft) => {
      draft.optionToggle = optionsAll ? 'station' : 'all';
      draft.options = optionsAll ? aushilfen.station : aushilfen.all;
    });

  // const toggleRegion = () =>
  //   updateAhState((draft) => {
  //     draft.optionToggle = optionsRegion ? 'station' : 'region';
  //     draft.options = optionsRegion ? aushilfen.station : aushilfen.region;
  //   });

  const selectAushilfe = (ah) => {
    updateAhState((draft) => {
      draft.selectedAH = ah;
    });
  };

  return {
    isLoading,
    ahState,
    optionsAll,
    toggleAll,
    selectAushilfe,
  };
}

export default useAhAutocomplete;
