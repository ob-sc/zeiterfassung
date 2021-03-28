export const tripDigitStation = (station) =>
  station < 100 ? `0${station}` : station;

export const addZeroToTen = (num) => (num < 10 ? `0${num}` : `${num}`);

// prettier-ignore
export const nowTimeString = `${addZeroToTen(new Date().getHours())}:${addZeroToTen(new Date().getMinutes())}`;
