import { useQuery } from 'react-query';
import fetchData from '../util/fetchData';

function useSession() {
  const result = useQuery(
    'session',
    async () => await fetchData('/api/session')
  );
  return result;
}

export default useSession;
