import { useQueryClient } from 'react-query';
import { navigate } from '@reach/router';
import { useCreateMutation, useCreateQuery } from '../util/api';
import useToastContext from '../context/ToastContext';

// session cookie 10 min gültig, dann läuft die session ab
// idleTimer loggt schon nach 5 min aus (guckt allerdings nicht im Hintergrund?)

const useSession = () => {
  return useCreateQuery('session', '/api/session', {
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useCreateMutation('/api/session', 'post', () => {
    queryClient.invalidateQueries('session');
    navigate('/', { replace: true });
  });
};

export const useDeleteSession = (expire) => {
  const queryClient = useQueryClient();
  const { addMessage } = useToastContext();

  return useCreateMutation('/api/session', 'delete', () => {
    if (expire) addMessage('Session abgelaufen', 'warning');
    queryClient.invalidateQueries('session');
  });
};

export const useUpdateSession = () => {
  const queryClient = useQueryClient();

  return useCreateMutation('/api/session', 'put', () => {
    queryClient.invalidateQueries('session');
  });
};

export default useSession;
