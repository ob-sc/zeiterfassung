import { useQuery } from 'react-query';
import useAuthContext from '../context/AuthContext';
import fetchData from '../util/fetchData';

function useAllAushilfen() {
  const { station } = useAuthContext();
  const result = useQuery(
    'aushilfen',
    async () => await fetchData('/api/aushilfen')
  );
  const { status, data } = result;

  if (status === 'success') {
    const stationAH = [];

    for (let item of data) {
      if (item.station === station) stationAH.push(item);
    }

    return { station: stationAH, all: data };
  }

  return { station: [], all: [] };
}

export default useAllAushilfen;
