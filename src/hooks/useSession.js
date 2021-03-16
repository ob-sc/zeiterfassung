import { useQuery } from 'react-query';
import { getData } from '../util/fetchData';

const getSession = async () => {
  const data = await getData('/api/session');
  return data.payload;
};

function useSession() {
  const query = useQuery('session', getSession, {
    retry: false,
    // refetchInterval: 300000,
  });
  return query;
}

export default useSession;
