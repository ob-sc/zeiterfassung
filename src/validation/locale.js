/* eslint-disable no-template-curly-in-string */

export const mixed = {
  default: 'Feld ist ungültig',
  required: 'Pflichtfeld',
  oneOf: 'Feld muss einem der folgenden Werte entsprechen: ${values}',
  notOneOf: 'Feld darf keinem der folgenden Werte entsprechen: ${values}',
};

export const string = {
  length: 'Feld muss genau ${length} Zeichen lang sein',
  min: 'Feld muss mindestens ${min} Zeichen lang sein',
  max: 'Feld darf höchstens ${max} Zeichen lang sein',
  matches: 'Feld entspricht nicht den Anforderungen',
  email: 'Feld muss eine gültige E-Mail-Adresse enthalten',
  url: 'Feld muss eine gültige URL sein',
  trim: 'Feld darf keine Leerzeichen am Anfang oder Ende enthalten',
  lowercase: 'Feld darf nur Kleinschreibung enthalten',
  uppercase: 'Feld darf nur Großschreibung enthalten',
};

export const number = {
  min: 'Feld muss größer oder gleich ${min} sein',
  max: 'Feld muss kleiner oder gleich ${max} sein',
  lessThan: 'Feld muss kleiner sein als ${less}',
  moreThan: 'Feld muss größer sein als ${more}',
  notEqual: 'Feld darf nicht gleich sein mit "${notEqual}"',
  positive: 'Feld muss eine positive Zahl sein',
  negative: 'Feld muss eine negative Zahl sein',
  integer: 'Feld muss eine ganze Zahl sein',
};

export const date = {
  min: 'Feld muss später sein als ${min}',
  max: 'Feld muss früher sein als ${max}',
};

export const boolean = {};

export const object = {
  noUnknown:
    'Feld darf keine Schlüssel verwenden, die nicht im "Objekt-Shape" definiert wurden',
};

export const array = {
  min: 'Feld muss mindesten ${min} Einträge haben',
  max: 'Feld darf höchstens ${max} Einträge haben',
};

const index = {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};

export default index;
