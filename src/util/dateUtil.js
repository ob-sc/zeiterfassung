import { isToday, parseISO, format } from 'date-fns';

export const anmeldungIsToday = (date, time) => {
  const timeArray = time.split(':');
  const timeString = `${timeArray[0]}:${timeArray[1]}`;
  const anmeldungToday = isToday(parseISO(date));
  const dateString = `${format(parseISO(date), 'dd.MM.yyyy')}`;
  const string = !anmeldungToday ? `${dateString}, ${timeString}` : timeString;
  return { string, anmeldungToday };
};
