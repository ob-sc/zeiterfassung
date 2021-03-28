import { useQuery, useMutation, useQueryClient } from 'react-query';
import { navigate } from '@reach/router';
import useToastContext from '../context/ToastContext';
import fetchData from '../util/fetchData';

// session cookie 10 min gültig, dann läuft die session ab
// idleTimer loggt schon nach 5 min aus (guckt allerdings nicht im Hintergrund?)

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  const { addError } = useToastContext();

  return useMutation((values) => fetchData('/api/session', 'post', values), {
    onError: addError,
    onSuccess: () => {
      queryClient.invalidateQueries('session');
      navigate('/', { replace: true });
    },
  });
};

export const useDeleteSession = (expire) => {
  const queryClient = useQueryClient();
  const { addError, addMessage } = useToastContext();

  return useMutation(() => fetchData('/api/session', 'delete', {}), {
    onError: addError,
    onSuccess: () => {
      if (expire) addMessage('Session abgelaufen', 'warning');
      queryClient.invalidateQueries('session');
    },
  });
};

export const useUpdateSession = () => {
  const queryClient = useQueryClient();
  const { addError } = useToastContext();

  return useMutation(
    (station) => fetchData('/api/session', 'put', { station }),
    {
      onError: addError,
      onSuccess: () => {
        queryClient.invalidateQueries('session');
      },
    }
  );
};

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

  return {
    isSuccess,
    isError,
    isLoading: status === 'loading' || isFetching,
    data: isSuccess ? data : [],
  };
};

export default useSession;
