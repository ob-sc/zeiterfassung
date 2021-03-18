import { useQuery } from 'react-query';
import fetchData from '../util/fetchData';
import useSession from './useSession';

function useAllAushilfen() {
  const { data } = useSession();
  const { station } = data;

  const stationAH = [];
  const result = useQuery(
    'aushilfen',
    async () => await fetchData('/api/aushilfen')
  );

  const test = [
    { test: 'test', station: 70 },
    { test: 'ta', station: 10 },
    { station: 70 },
    { station: 11 },
  ];
  for (let [i, v] of test.entries()) {
    if ((v.station = station)) stationAH.push(v);
  }

  return { station: stationAH, all: test };
}

export default useAllAushilfen;
