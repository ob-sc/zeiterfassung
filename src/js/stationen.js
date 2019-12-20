// alle = 1; nord = 2; berlin = 3; mitte = 4; hannover = 5; süd = 6; frankfurt = 7; Verwaltung = 8

const stationen = new Map([
  [
    10,
    {
      name: 'Hamburg-Jenfeld',
      region: [1, 2]
    }
  ],
  [
    11,
    {
      name: 'Hamburg-Eppendorf',
      region: [1, 2]
    }
  ],
  [
    12,
    {
      name: 'Hamburg-Eiffestraße',
      region: [1, 2]
    }
  ],
  [
    13,
    {
      name: 'Hamburg-Heimfeld',
      region: [1, 2]
    }
  ],
  [
    14,
    {
      name: 'Hamburg-Billstedt',
      region: [1, 2]
    }
  ],
  [
    15,
    {
      name: 'Hamburg-Altona',
      region: [1, 2]
    }
  ],
  [
    18,
    {
      name: 'Hamburg-Osdorf',
      region: [1, 2]
    }
  ],
  [
    19,
    {
      name: 'Hamburg-Wandsbek',
      region: [1, 2]
    }
  ],
  [
    20,
    {
      name: 'Berlin-Tiergarten',
      region: [1, 3]
    }
  ],
  [
    21,
    {
      name: 'Berlin-Neukölln',
      region: [1, 3]
    }
  ],
  [
    22,
    {
      name: 'Berlin-Pankow',
      region: [1, 3]
    }
  ],
  [
    23,
    {
      name: 'Berlin-Rudow',
      region: [1, 3]
    }
  ],
  [
    24,
    {
      name: 'Berlin-Spandau',
      region: [1, 3]
    }
  ],
  [
    30,
    {
      name: 'Hannover',
      region: [1, 5]
    }
  ],
  [
    32,
    {
      name: 'Bremen',
      region: [1, 2]
    }
  ],
  [
    33,
    {
      name: 'Hannover-Döhren',
      region: [1, 5]
    }
  ],
  [
    36,
    {
      name: 'Braunschweig',
      region: [1, 2]
    }
  ],
  [
    40,
    {
      name: 'Köln-Sülz',
      region: [1, 4]
    }
  ],
  [
    45,
    {
      name: 'Köln-Ehrenfeld',
      region: [1, 4]
    }
  ],
  [
    46,
    {
      name: 'Köln-Porz',
      region: [1, 4]
    }
  ],
  [
    47,
    {
      name: 'Köln-Dellbrück',
      region: [1, 4]
    }
  ],
  [
    50,
    {
      name: 'Essen',
      region: [1, 4]
    }
  ],
  [
    52,
    {
      name: 'Düsseldorf',
      region: [1, 4]
    }
  ],
  [
    54,
    {
      name: 'Dortmund',
      region: [1, 4]
    }
  ],
  [
    55,
    {
      name: 'Frankfurt-Ostend',
      region: [1, 4]
    }
  ],
  [
    56,
    {
      name: 'Frankfurt-Griesheim',
      region: [1, 4]
    }
  ],
  [
    57,
    {
      name: 'Bad Homburg',
      region: [1, 4]
    }
  ],
  [
    60,
    {
      name: 'Kiel',
      region: [1, 2]
    }
  ],
  [
    63,
    {
      name: 'München',
      region: [1, 6]
    }
  ],
  [
    70,
    {
      name: 'Verwaltung',
      region: [1, 8]
    }
  ],
  [
    89,
    {
      name: 'Bußgeldmanagement',
      region: [1, 8]
    }
  ],
  [
    113,
    {
      name: 'Harburg-Mitte',
      region: [1, 2]
    }
  ],
  [
    114,
    {
      name: 'Hamburg-Langenhorn',
      region: [1, 2]
    }
  ]
]);

export default stationen;
