import { useQuery } from 'react-query';
import routes from '../constants/routes';
import stations from '../constants/stations';
import fetchData from '../util/fetchData';

const authRoutes = (userStatus) => {
  const routeArray = [];
  const routeObject = {};
  for (let item of routes) {
    for (let access of item.route.access) {
      if (access === userStatus) {
        routeArray.push(item);
        routeObject[item.label.toLowerCase()] = true;
      }
    }
  }
  const onlyHome = routeArray.length === 1;
  return onlyHome ? null : { routeArray, routeObject };
};

const authStations = (userStation, extstat, userRegion) => {
  const authenticated = [];
  let extstatArray = [];

  for (const element of stations) {
    // bei jeder iteration soll nur 1 mal gepushed werden
    element.isPushed = false;
    // func pushStation hier für isPushed side effect
    const pushStation = () => {
      if (element.isPushed !== true) {
        // nur nummer und name returnen
        const stationObject = {
          number: element.num,
          name: element.station.name,
        };
        authenticated.push(stationObject);
        element.isPushed = true;
      }
    };

    if (element.num === userStation) pushStation();
    // extstat in der db ist zb "11,12,15"
    // diesen string parsen zu array
    if (typeof extstat === 'string') {
      extstatArray = extstat.split(',');
      for (let extraStation of extstatArray) {
        if (parseInt(extraStation) === element.num) pushStation();
      }
    }

    for (let stationRegion of element.station.region) {
      if (stationRegion === userRegion) pushStation();
    }
  }
  return authenticated;
};

const useAuth = () => {
  // session cookie 10 min gültig, dann läuft die session ab
  // idleTimer loggt schon nach 5 min aus, guckt allerdings nicht im Hintergrund
  const { status, error, data, isFetching } = useQuery(
    'session',
    async () => await fetchData('/api/session'),
    { refetchOnWindowFocus: false }
  );

  // eigene booleans statt isLoading und isError aus usequery
  // ist aber eig egal, muss nur isFetching noch abfangen
  const statusBools = {
    isLoading: false,
    isError: false,
  };

  if (status === 'loading' || isFetching)
    return { ...statusBools, isLoading: true };

  // return userdaten
  if (status === 'success') {
    const { routeArray, routeObject } = authRoutes(data.access);
    const authedStations = authStations(
      data.station,
      data.extstat,
      data.region
    );

    return {
      ...statusBools,
      username: data.username,
      station: data.currentStation,
      isLoggedIn: data.isLoggedIn,
      routes: routeArray,
      routeAuth: routeObject,
      stations: authedStations,
    };
  }

  // default case (error)
  return { ...statusBools, error, isError: true };
};

export default useAuth;
