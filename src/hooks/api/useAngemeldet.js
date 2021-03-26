import { useQuery } from 'react-query';
import useToastContext from '../../context/ToastContext';
import fetchData from '../../util/fetchData';

const useAngemeldet = () => {
  const { addError } = useToastContext();

  const { status, isSuccess, isError, data, isFetching } = useQuery(
    'angemeldet',
    async () => await fetchData('/api/angemeldet'),
    {
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

export default useAngemeldet;

/*
ahid: 888
date: "2020-12-21T23:00:00.000Z"
nachname: "asddddd"
name: "asd asddddd"
start: "00:00:00"
vorname: "asd"
*/
