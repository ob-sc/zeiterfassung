import { useQuery, useMutation } from 'react-query';
import useToastContext from '../context/ToastContext';

const prefixRoute = (route) => {
  const { NODE_ENV, REACT_APP_HOST, REACT_APP_PORT } = process.env;
  const isDev = NODE_ENV === 'development';
  const slash = route[0] === '/' ? '' : '/';
  const host = isDev
    ? `http://localhost:${REACT_APP_PORT}`
    : `http://${REACT_APP_HOST}:${REACT_APP_PORT}`;

  return `${host}${slash}${route}`;
};

export const fetchData = async (route, type = 'get', data = {}) => {
  const url = prefixRoute(route);
  const method = type.toUpperCase();
  const headers = {
    'Content-Type': 'application/json',
  };
  const init =
    method === 'GET'
      ? {
          credentials: 'include',
        }
      : {
          credentials: 'include',
          method,
          headers,
          body: JSON.stringify(data),
        };
  const res = await fetch(url, init);

  const noJSON = res.status === 204 || res.status === 205;
  const response = noJSON ? {} : await res.json();

  if (!res.ok) throw new Error(response.msg ?? 'API Fehler');
  return response;
};

export const useCreateQuery = (key, url, options = {}) => {
  const { addError } = useToastContext();
  const init = {
    onError: addError,
    ...options,
  };

  const { status, isSuccess, isError, data, isFetching } = useQuery(
    key,
    async () => await fetchData(url),
    init
  );

  return {
    isSuccess,
    isError,
    isLoading: status === 'loading' || isFetching,
    data: isSuccess ? data : [],
  };
};

export const useCreateMutation = (url, method, handleSuccess) => {
  const { addError } = useToastContext();

  const init = { onError: addError };
  if (handleSuccess !== undefined) init.onSuccess = handleSuccess;

  return useMutation((values) => fetchData(url, method, values), init);
};
