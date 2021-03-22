export const tripDigitStation = (station) =>
  station < 100 ? `0${station}` : station;

export const addZeroToTen = (num) => (num < 10 ? `0${num}` : `${num}`);
