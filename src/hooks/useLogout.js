import fetchData from '../util/fetchData';
import useToastContext from '../context/ToastContext';

const useLogout = () => {
  const { addError } = useToastContext();

  return () => {
    fetchData('api/session', {}, 'delete')
      .then(() => {
        window.location.reload();
      })
      .catch(addError);
  };
};

export default useLogout;
