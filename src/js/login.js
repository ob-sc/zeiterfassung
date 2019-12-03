import { fehler, info } from './funktionen';

$(document).ready(() => {
  $('#regForm').submit(e => {
    e.preventDefault();

    $('#pwLaenge').hide();
    $('#pwGleich').hide();
    $('#fehlerAlert').hide();

    const name = $('#username').val();
    const pw1 = $('#password1').val();
    const pw2 = $('#password2').val();

    // check länge und ob passwörter gleich sind
    if (pw1.length < 6) {
      $('#pwLaenge').show();
      return;
    }
    if (pw1 !== pw2) {
      $('#pwGleich').show();
      return;
    }

    // check ob leer
    if ($.trim(name) === '') {
      fehler('Benutzername ist leer!');
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

    $.ajax({
      url: '../scripts/register.php',
      method: 'POST',
      data: $('#regForm').serialize()
    })
      .done(data => {
        info(data);
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });

  // Benutzername gibt es schon
  if (window.location.hash === '#exists') {
    fehler('Benutzername existiert bereits!');
    window.history.replaceState(null, null, ' ');
  }

  // Login:
  if (window.location.hash === '#expire') {
    fehler('Sitzung abgelaufen, bitte neu anmelden!');
    window.history.replaceState(null, null, ' ');
  }

  if (window.location.hash === '#neu') {
    fehler('Lass deinen Account von deinem Stationsleiter bestätigen.');
    window.history.replaceState(null, null, ' ');
  }

  if (window.location.hash === '#loginerror') {
    fehler('Benutzername / Passwort falsch!');
    window.history.replaceState(null, null, ' ');
  }

  if (window.location.hash === '#verlaufen') {
    fehler(
      'Wenn du dich verlaufen hast: <a href="https://maps.google.de">Hier ist Hilfe</a>'
    );
    window.history.replaceState(null, null, ' ');
  }
});
