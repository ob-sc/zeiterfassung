export const byStation = (a, b) => {
  if (a.station < b.station) {
    return -1;
  }
  if (a.station > b.station) {
    return 1;
  }
  return 0;
};

// array.sort(byStation);
