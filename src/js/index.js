import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './cssbundle';

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

// login:

if (window.location.hash === '#expire') {
  $('#fehlerAlert').show();
  $('#fehlerText').html('Sitzung abgelaufen, bitte neu anmelden!');
  window.history.replaceState(null, null, ' ');
}

if (window.location.hash === '#neu') {
  $('#fehlerAlert').show();
  $('#fehlerText').html(
    'Lass deinen Account von deinem Stationsleiter bestätigen.'
  );
  window.history.replaceState(null, null, ' ');
}

if (window.location.hash === '#loginerror') {
  $('#fehlerAlert').show();
  $('#fehlerText').html('Benutzername / Passwort falsch!');
  window.history.replaceState(null, null, ' ');
}

// registrieren

$(document).ready(function() {
  $('#regForm').submit(function(e) {
    e.preventDefault();

    $('#pwLaenge').hide();
    $('#pwGleich').hide();
    $('#fehlerAlert').hide();

    let name = $('#username').val();
    let pw1 = $('#password1').val();
    let pw2 = $('#password2').val();

    // check länge und ob passwörter gleich sind
    if (pw1.length < 6) {
      $('#pwLaenge').show();
      return;
    } else if (pw1 != pw2) {
      $('#pwGleich').show();
      return;
    }

    // check ob leer
    if ($.trim(name) === '') {
      $('#fehlerAlert').show();
      $('#fehlerText').html('<strong>Benutzername ist leer!</strong>');
      return;
    }

    /* TODO REGEX https://eloquentjavascript.net/09_regexp.html
        // check ob nur kleinbuchstaben und .
        let erlaubt = /^[a-z\.]/;
        //let nameLowercase = name.toLowerCase();
        if (erlaubt.test(name)) {
            console.log('nicht ' + erlaubt.test(name));
            return;
        }
        console.log('ok ' + erlaubt.test(name));
        */

    $('#regForm')[0].submit();
  });

  // Benutzername gibt es schon
  if (window.location.hash == '#exists') {
    $('#fehlerAlert').show();
    $('#fehlerText').html('<strong>Benutzername existiert bereits!</strong>');
    history.replaceState(null, null, ' ');
  }
  // Erfolg
  if (window.location.hash == '#regsuccess') {
    $('#erfolgAlert').show();
    $('#erfolgText').html('<strong>Erfolgreich registriert!</strong>');
    history.replaceState(null, null, ' ');
  }
});
