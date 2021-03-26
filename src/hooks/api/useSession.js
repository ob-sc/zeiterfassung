import { useQuery } from 'react-query';
import useToastContext from '../../context/ToastContext';
import fetchData from '../../util/fetchData';

// session cookie 10 min gültig, dann läuft die session ab
// idleTimer loggt schon nach 5 min aus, guckt allerdings nicht im Hintergrund
const useSession = () => {
  const { addError } = useToastContext();

  const { status, isSuccess, isError, data, isFetching } = useQuery(
    'session',
    async () => await fetchData('/api/session'),
    {
      retry: false,
      refetchOnWindowFocus: false,
      onError: addError,
    }
  );

  const query = {
    isSuccess,
    isError,
    isLoading: status === 'loading' || isFetching,
    data: isSuccess ? data : [],
  };

  return query;
};

export default useSession;
