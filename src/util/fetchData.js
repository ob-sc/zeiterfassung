const headers = {
  'Content-Type': 'application/json',
};

const prefixRoute = (route) => {
  const { NODE_ENV, REACT_APP_PORT } = process.env;
  const isDev = NODE_ENV === 'development';
  const slash = route[0] === '/' ? '' : '/';
  const server = isDev
    ? `http://localhost:${REACT_APP_PORT}`
    : `https://192.168.100.39:${REACT_APP_PORT}`;

  return `${server}${slash}${route}`;
};

export const getData = async (route) => {
  const url = prefixRoute(route);
  const res = await fetch(url);

  const response = await res.json();
  if (!res.ok) throw new Error(response.msg);

  return response;
};

export const postData = async (route, data = {}) => {
  const url = prefixRoute(route);
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  const response = await res.json();
  if (!res.ok) throw new Error(response.msg);

  return response;
};

export const updateData = async (route, data = {}) => {
  const url = prefixRoute(route);
  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });

  const response = await res.json();
  if (!res.ok) throw new Error(response.msg);

  return response;
};

export const deleteData = async (route, data = {}) => {
  const url = prefixRoute(route);
  const res = await fetch(url, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(data),
  });

  const response = await res.json();
  if (!res.ok) throw new Error(response.msg);

  return response;
};
