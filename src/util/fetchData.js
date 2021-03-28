const prefixRoute = (route) => {
  const { NODE_ENV, REACT_APP_HOST, REACT_APP_PORT } = process.env;
  const isDev = NODE_ENV === 'development';
  const slash = route[0] === '/' ? '' : '/';
  const host = isDev
    ? `http://localhost:${REACT_APP_PORT}`
    : `https://${REACT_APP_HOST}:${REACT_APP_PORT}`;

  return `${host}${slash}${route}`;
};

const fetchData = async (route, type = 'get', data = {}) => {
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

// get, post, put, delete

export default fetchData;
