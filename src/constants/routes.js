/*
 * 1 = admin
 * 2 = lohnkanzlei
 * 3 = gebietsleiter
 * 4 = stationsleiter
 * 5 = counter
 */

const routes = [
  {
    label: 'Home',
    route: {
      href: '/',
      access: [1, 2, 3, 4, 5],
    },
  },
  {
    label: 'Admin',
    route: {
      href: '/admin',
      access: [1],
    },
  },
  {
    label: 'Reporte',
    route: {
      href: '/reports',
      access: [1, 2],
    },
  },
  {
    label: 'Region',
    route: {
      href: '/region',
      access: [1, 3],
    },
  },
  {
    label: 'Station',
    route: {
      href: '/station',
      access: [1, 2, 3, 4],
    },
  },
];

export default routes;
