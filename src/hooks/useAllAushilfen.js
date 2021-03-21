import { useQuery } from 'react-query';
import useAuthContext from '../context/AuthContext';
import fetchData from '../util/fetchData';

function useAllAushilfen() {
  const { station } = useAuthContext();
  const result = useQuery(
    'aushilfen',
    async () => await fetchData('/api/aushilfen')
  );
  const { status, data, isFetching } = result;

  const aushilfen = {
    station: [],
    all: [],
    isLoading: false,
  };

  if (status === 'loading' || isFetching) aushilfen.isLoading = true;

  if (status === 'success') {
    for (let item of data) {
      if (item.station === station) aushilfen.station.push(item);
    }
    aushilfen.all = data;
  }

  return aushilfen;
}

export default useAllAushilfen;
