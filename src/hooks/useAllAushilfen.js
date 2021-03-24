import { useQuery } from 'react-query';

import useAuthContext from '../context/AuthContext';
import fetchData from '../util/fetchData';

const useAllAushilfen = () => {
  const { station } = useAuthContext();

  const { status, data, error, isFetching } = useQuery(
    'aushilfen',
    async () => await fetchData('/api/aushilfen')
  );

  const aushilfen = {
    station: [],
    all: [],
    isLoading: false,
    error: status === 'error' ? error : null,
  };

  if (status === 'loading' || isFetching) aushilfen.isLoading = true;

  if (status === 'success') {
    for (let item of data) {
      if (item.station === station) aushilfen.station.push(item);
    }
    aushilfen.all = data;
    aushilfen.isSuccess = true;
  }

  return aushilfen;
};

export default useAllAushilfen;
