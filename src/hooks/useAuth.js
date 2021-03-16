import useSession from './useSession';
import routes from '../constants/routes';
import stations from '../constants/stations';

const authRoutes = (userStatus) => {
  const authenticated = [];
  for (let item of routes) {
    for (let access of item.route.access) {
      if (access === userStatus) authenticated.push(item);
    }
  }
  const onlyHome = authenticated.length === 1;
  return onlyHome ? null : authenticated;
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
    // diesen string parsen -> array
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
  const { status, error, data, isFetching } = useSession();
  const authObject = {
    isLoading: false,
    isError: false,
  };

  // status === loading ist manchmal false trotz isFetching true, deshalb beide
  if (status === 'loading' || isFetching)
    return { ...authObject, isLoading: true };

  if (status === 'success') {
    const authedRoutes = authRoutes(data.access);
    const authedStations = authStations(
      data.station,
      data.extstat,
      data.region
    );

    // return userdaten
    return {
      ...authObject,
      username: data.username,
      station: data.currentStation,
      isLoggedIn: data.isLoggedIn,
      routes: authedRoutes,
      stations: authedStations,
    };
  }

  // default case (error)
  return { ...authObject, error, isError: true };
};

export default useAuth;
