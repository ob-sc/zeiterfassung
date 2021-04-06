export const tripDigitStation = (station) => (station < 100 ? `0${station}` : station);

export const addZeroToTen = (num) => (num < 10 ? `0${num}` : `${num}`);

// prettier-ignore
export const nowTimeString = `${addZeroToTen(new Date().getHours())}:${addZeroToTen(new Date().getMinutes())}`;

export const formatMinutes = (inpMin, object = false) => {
  // object = true: return h und m als objekt
  const h = Math.floor(inpMin / 60);
  const m = inpMin % 60;
  let hours = h;
  let minutes = m;
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  return !object ? `${hours}:${minutes}` : { h, m };
};

export const toFixedTwo = (v) => {
  // value als string
  const value = String(v);

  // wenn kein . dann return mit 2 nullen
  if (!value.includes('.')) return `${value},00`;

  // trennen bei "."
  const values = value.split('.');
  const [decimal, decimalPlaceTotal] = values;
  const twoPlaces = decimalPlaceTotal.substr(0, 2);

  // prüfen auf kleiner drei nachkommastellen
  if (decimalPlaceTotal.length < 3) return `${decimal},${twoPlaces.padEnd(2, '0')}`;

  // dritte nachkommastelle zur prüfung auf- oder abrunden
  const decider = parseInt(decimalPlaceTotal[2], 10);

  // prüfen ob auf- oder abrunden
  if (decider < 5) return `${decimal},${twoPlaces}`;

  // prüfen ob dezimalsprung
  if (twoPlaces === '99') {
    const decimalRoundedUp = parseInt(decimal, 10);
    return `${decimalRoundedUp + 1},00`;
  }

  // prüfen ob erste stelle nicht null
  if (decimalPlaceTotal[0] !== '0') {
    // "einfach" aufrunden
    const roundedUp = parseInt(twoPlaces, 10);
    return `${decimal},${roundedUp + 1}`;
  }

  // letzte stelle zur prüfung aufrunden
  let lastPlace = parseInt(decimalPlaceTotal[1], 10);
  lastPlace += 1;
  // prüfen ob zehnersprung nach aufrunden, dann zweistellig zurückgeben
  if (lastPlace > 9) return `${decimal},${lastPlace}`;

  // wenn kein zehnersprung, dann "0" und einstellig zurückgeben
  return `${decimal},0${lastPlace}`;
};
