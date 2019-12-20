import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './cssbundle';

import './general';

import stationen from './stationen';

import { session } from './funktionen';

stationen.forEach((value, key) => {
  console.warn(key);
  console.log(value);
});

switch (window.location.pathname) {
  case '/eintragen':
  case '/eintragen/':
  case '/eintragen/index.html':
    session('norm');
    // eslint-disable-next-line global-require
    require('./eintragen');
    break;
  case '/auswerten':
  case '/auswerten/':
  case '/auswerten/index.html':
    session('norm');
    // eslint-disable-next-line global-require
    require('./auswerten');
    break;
  case '/abrechnung':
  case '/abrechnung/':
  case '/abrechnung/index.html':
    session('sl');
    // eslint-disable-next-line global-require
    require('./abrechnung');
    break;
  case '/aushilfen':
  case '/aushilfen/':
  case '/aushilfen/index.html':
    session('sl');
    // eslint-disable-next-line global-require
    require('./aushilfen');
    break;
  case '/zeiten':
  case '/zeiten/':
  case '/zeiten/index.html':
    session('sl');
    // eslint-disable-next-line global-require
    require('./zeiten');
    break;
  case '/mitarbeiter':
  case '/mitarbeiter/':
  case '/mitarbeiter/index.html':
    session('sl');
    // eslint-disable-next-line global-require
    require('./mitarbeiter');
    break;
  case '/readme':
  case '/readme/':
  case '/readme/index.html':
    // eslint-disable-next-line global-require
    session('norm');
    break;
  default:
    // eslint-disable-next-line global-require
    require('./login');
}
