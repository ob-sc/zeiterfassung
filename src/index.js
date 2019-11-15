import dataJSON from './request';

// eslint-disable-next-line default-case
switch (window.location.pathname) {
  case '/eintragen':
  case '/eintragen/':
  case '/eintragen/index.php':
    // eslint-disable-next-line global-require
    require('./eintragen');
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
  case '/mitarbeiter':
  case '/mitarbeiter/':
  case '/mitarbeiter/index.php':
    // eslint-disable-next-line global-require
    require('./mitarbeiter');
    break;
}

$(document).ready(() => {
  // für jeden input Datum - automatisch Datum heute
  const datumInput = document.getElementById('datum');
  if (datumInput) datumInput.valueAsDate = new Date();
});

$.getJSON('../scripts/getconfig.php').done(data => {
  const { settings } = data.daten;
  // eslint-disable-next-line no-console
  if (settings.devmode === '1') console.log('dev');
});

$(document).ajaxComplete(() => {
  const userStatus = dataJSON.responseJSON.status;
  // ADMIN / SL für Menü
  if (userStatus === 'admin') $('#adminmenu, .slmenu').show();
  if (userStatus === 'sl') $('.slmenu').show();
});
