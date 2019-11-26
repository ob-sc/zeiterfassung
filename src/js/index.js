import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './cssbundle';

import './general';

switch (window.location.pathname) {
  case '/eintragen':
  case '/eintragen/':
  case '/eintragen/index.html':
    // eslint-disable-next-line global-require
    require('./eintragen');
    break;
  case '/rufdienst':
  case '/rufdienst/':
  case '/rufdienst/index.html':
    // eslint-disable-next-line global-require
    require('./rufdienst');
    break;
  case '/auswerten':
  case '/auswerten/':
  case '/auswerten/index.html':
    // eslint-disable-next-line global-require
    require('./auswerten');
    break;
  case '/abrechnung':
  case '/abrechnung/':
  case '/abrechnung/index.html':
    // eslint-disable-next-line global-require
    require('./abrechnung');
    break;
  case '/aushilfen':
  case '/aushilfen/':
  case '/aushilfen/index.html':
    // eslint-disable-next-line global-require
    require('./aushilfen');
    break;
  case '/zeiten':
  case '/zeiten/':
  case '/zeiten/index.html':
    // eslint-disable-next-line global-require
    require('./zeiten');
    break;
  case '/mitarbeiter':
  case '/mitarbeiter/':
  case '/mitarbeiter/index.html':
    // eslint-disable-next-line global-require
    require('./mitarbeiter');
    break;
  default:
    // eslint-disable-next-line global-require
    require('./login');
    // eslint-disable-next-line global-require
    require('./register');
}
