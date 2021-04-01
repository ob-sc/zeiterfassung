import { isToday, parseISO, format } from 'date-fns';

export const localDate = (date) =>
  date === undefined ? null : format(parseISO(date), 'dd.MM.yyyy');

export const anmeldungIsToday = (date, time) => {
  const timeArray = time.split(':');
  const timeString = `${timeArray[0]}:${timeArray[1]}`;
  const anmeldungToday = isToday(parseISO(date));
  const dateString = `${localDate(date)}`;
  const string = !anmeldungToday ? `${dateString}, ${timeString}` : timeString;
  return { string, anmeldungToday };
};
