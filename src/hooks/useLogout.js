import { useQueryClient } from 'react-query';
import fetchData from '../util/fetchData';
import useToastContext from '../context/ToastContext';

const useLogout = (expire = false) => {
  const { addError, addMessage } = useToastContext();
  const queryClient = useQueryClient();

  return () => {
    fetchData('api/session', {}, 'delete')
      .then(() => {
        if (expire) addMessage('Session abgelaufen', 'warning');
        queryClient.invalidateQueries('session');
      })
      .catch(addError);
  };
};

export default useLogout;
