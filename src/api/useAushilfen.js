import { useQuery } from 'react-query';
import useToastContext from '../context/ToastContext';
import useAuthContext from '../context/AuthContext';
import fetchData from '../util/fetchData';

const useAushilfen = () => {
  const { addError } = useToastContext();
  const { station } = useAuthContext();

  const { status, isSuccess, isError, data, isFetching } = useQuery(
    'aushilfen',
    async () => await fetchData('/api/aushilfen'),
    {
      onError: addError,
    }
  );

  const query = {
    isSuccess,
    isError,
    isLoading: status === 'loading' || isFetching,
    data: { station: [], all: [] },
  };

  if (isSuccess) {
    for (let item of data) {
      if (item.station === station) query.data.station.push(item);
    }
    query.data.all = data;
  }

  return query;
};

export default useAushilfen;
