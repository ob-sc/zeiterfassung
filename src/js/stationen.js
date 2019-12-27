/*  alle = 1; nord = 2; berlin = 3; mitte = 4; hannover = 5; süd = 6; frankfurt = 7;
 *  Verwaltung = 8; köln 40+41 = 9; köln 46+43 = 10; frankfurt 55+57 = 11; harburg 13+113 = 12;
 */

const stationen = new Map();

stationen.set(10, {
  name: 'Hamburg-Jenfeld',
  region: [1, 2]
});

stationen.set(11, {
  name: 'Hamburg-Eppendorf',
  region: [1, 2]
});

stationen.set(12, {
  name: 'Hamburg-Eiffestraße',
  region: [1, 2]
});

stationen.set(13, {
  name: 'Hamburg-Heimfeld',
  region: [1, 2, 12]
});

stationen.set(14, {
  name: 'Hamburg-Billstedt',
  region: [1, 2]
});

stationen.set(15, {
  name: 'Hamburg-Altona',
  region: [1, 2]
});

stationen.set(18, {
  name: 'Hamburg-Osdorf',
  region: [1, 2]
});

stationen.set(19, {
  name: 'Hamburg-Wandsbek',
  region: [1, 2]
});

stationen.set(20, {
  name: 'Berlin-Tiergarten',
  region: [1, 3]
});

stationen.set(21, {
  name: 'Berlin-Neukölln',
  region: [1, 3]
});

stationen.set(22, {
  name: 'Berlin-Pankow',
  region: [1, 3]
});

stationen.set(23, {
  name: 'Berlin-Rudow',
  region: [1, 3]
});

stationen.set(24, {
  name: 'Berlin-Spandau',
  region: [1, 3]
});

stationen.set(30, {
  name: 'Hannover',
  region: [1, 5]
});

stationen.set(32, {
  name: 'Bremen',
  region: [1, 2]
});

stationen.set(33, {
  name: 'Hannover-Döhren',
  region: [1, 5]
});

stationen.set(36, {
  name: 'Braunschweig',
  region: [1, 2]
});

stationen.set(40, {
  name: 'Köln-Sülz',
  region: [1, 4, 9]
});

stationen.set(41, {
  name: 'Köln-Renault',
  region: [1, 4, 9]
});

stationen.set(43, {
  name: 'Köln St. Augustin',
  region: [1, 4, 10]
});

stationen.set(45, {
  name: 'Köln-Ehrenfeld',
  region: [1, 4]
});

stationen.set(46, {
  name: 'Köln-Porz',
  region: [1, 4, 10]
});

stationen.set(47, {
  name: 'Köln-Dellbrück',
  region: [1, 4]
});

stationen.set(50, {
  name: 'Essen',
  region: [1, 4]
});

stationen.set(52, {
  name: 'Düsseldorf',
  region: [1, 4]
});

stationen.set(54, {
  name: 'Dortmund',
  region: [1, 4]
});

stationen.set(55, {
  name: 'Frankfurt-Ostend',
  region: [1, 4, 11]
});

stationen.set(57, {
  name: 'Bad Homburg',
  region: [1, 4, 11]
});

stationen.set(60, {
  name: 'Kiel',
  region: [1, 2]
});

stationen.set(63, {
  name: 'München',
  region: [1, 6]
});

stationen.set(70, {
  name: 'Verwaltung',
  region: [1, 8]
});

stationen.set(89, {
  name: 'Bußgeldmanagement',
  region: [1, 8]
});

stationen.set(113, {
  name: 'Harburg-Mitte',
  region: [1, 2, 12]
});

stationen.set(114, {
  name: 'Hamburg-Langenhorn',
  region: [1, 2]
});

export default stationen;
