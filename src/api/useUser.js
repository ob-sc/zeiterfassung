import { useQuery, useMutation } from 'react-query';
import { navigate } from '@reach/router';
import useToastContext from '../context/ToastContext';
import fetchData from '../util/fetchData';

// session cookie 10 min gültig, dann läuft die session ab
// idleTimer loggt schon nach 5 min aus (guckt allerdings nicht im Hintergrund?)

export const useCreateUser = () => {
  const { addError } = useToastContext();

  return useMutation((values) => fetchData('/api/user', 'post', values), {
    onError: addError,
    onSuccess: () => {
      navigate('/login');
    },
  });
};

const useUser = () => {
  // todo route gibt es noch nicht
  const { addError } = useToastContext();

  const { status, isSuccess, isError, data, isFetching } = useQuery(
    'user',
    async () => await fetchData('/api/user'),
    { onError: addError }
  );

  return {
    isSuccess,
    isError,
    isLoading: status === 'loading' || isFetching,
    data: isSuccess ? data : [],
  };
};

export default useUser;
