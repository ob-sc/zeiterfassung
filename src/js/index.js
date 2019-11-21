import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../css/style.css';
import '../css/header.css';
import '../css/nav.css';
import '../css/container.css';
import '../css/autocomplete.css';

import './general';

// eslint-disable-next-line default-case
switch (window.location.pathname) {
  case '/eintragen':
  case '/eintragen/':
  case '/eintragen/index.php':
    // eslint-disable-next-line global-require
    require('./eintragen');
    break;
  case '/rufdienst':
  case '/rufdienst/':
  case '/rufdienst/index.php':
    // eslint-disable-next-line global-require
    require('./rufdienst');
    break;
  case '/auswerten':
  case '/auswerten/':
  case '/auswerten/index.php':
    // eslint-disable-next-line global-require
    require('./auswerten');
    break;
  case '/abrechnung':
  case '/abrechnung/':
  case '/abrechnung/index.php':
    // eslint-disable-next-line global-require
    require('./abrechnung');
    break;
  case '/aushilfen':
  case '/aushilfen/':
  case '/aushilfen/index.php':
    // eslint-disable-next-line global-require
    require('./aushilfen');
    break;
  case '/zeiten':
  case '/zeiten/':
  case '/zeiten/index.php':
    // eslint-disable-next-line global-require
    require('./zeiten');
    break;
  case '/mitarbeiter':
  case '/mitarbeiter/':
  case '/mitarbeiter/index.php':
    // eslint-disable-next-line global-require
    require('./mitarbeiter');
    break;
}
