import useAuthContext from '../context/AuthContext';
import { useCreateQuery } from '../util/api';

const useAushilfen = () => {
  const { station } = useAuthContext();

  // destructure query um data im return auszutauschen
  const { data, ...query } = useCreateQuery('aushilfen', '/api/aushilfen');

  const aushilfen = { station: [], all: [] };

  if (query.isSuccess) {
    for (let item of data) {
      if (item.station === station) aushilfen.station.push(item);
    }
    aushilfen.all = data;
  }

  return { data: aushilfen, ...query };
};

export default useAushilfen;
