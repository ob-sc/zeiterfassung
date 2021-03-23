const prefixRoute = (route) => {
  const { NODE_ENV, REACT_APP_PORT } = process.env;
  const isDev = NODE_ENV === 'development';
  const slash = route[0] === '/' ? '' : '/';
  const server = isDev
    ? `http://localhost:${REACT_APP_PORT}`
    : `https://192.168.100.39:${REACT_APP_PORT}`;

  return `${server}${slash}${route}`;
};

const fetchData = async (route, data = {}, type = 'get') => {
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

  const response = await res.json();
  if (!res.ok) throw new Error(response.msg);

  return response;
};

// get, post, put, delete

export default fetchData;
