import { fehler, info } from './funktionen';
import stationen from './stationen';

$(document).ready(() => {
  stationen.forEach((value, key) => {
    $('#station').append(`<option value='${key}'>${value.name}</option>`);
  });

  $('#loginForm').submit(e => {
    e.preventDefault();

    const name = $('#username').val();

    const lowercaseName = name.toLowerCase();

    const noSCName = lowercaseName.replace(/@starcar\.de/, '');

    $.ajax({
      url: '../scripts/login.php',
      method: 'POST',
      data: {
        username: noSCName,
        password: $('#password').val()
      }
    })
      .done(data => {
        const loginRes = JSON.parse(data);
        if (loginRes.valid === false)
          return fehler('Benutzername / Passwort falsch.');
        if (loginRes.status === 'neu')
          return fehler(
            'Lass deinen Account von deinem Stationsleiter bestätigen.'
          );
        if (
          (loginRes.valid === true && loginRes.status === 'lohnbuero') ||
          (loginRes.valid === true && loginRes.status === 'controlling')
        ) {
          window.location.href = '../lohnbuero';
          return false;
        }
        if (loginRes.valid === true) window.location.href = '../eintragen';
        return setTimeout(() => {
          fehler('Loginfehler. Bitte versuche es erneut!');
        }, 8000);
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });

  $('#regForm').submit(e => {
    e.preventDefault();

    $('#pwLaenge').hide();
    $('#pwGleich').hide();
    $('#fehlerAlert').hide();

    const name = $('#username')
      .val()
      .toLowerCase();
    const pw1 = $('#password1').val();
    const pw2 = $('#password2').val();

    // check länge und ob passwörter gleich sind
    if (pw1.length < 6) return $('#pwLaenge').show();

    if (pw1 !== pw2) return $('#pwGleich').show();

    // check ob leer
    if ($.trim(name) === '') return fehler('Benutzername ist leer!');

    // regex ob @starcar.de im name ist
    if (/@starcar\.de/.test(name))
      return fehler('Bitte lass <strong>@starcar.de</strong> weg.');

    // regex ob ein character enthalten ist, der nicht a-z oder . ist
    if (/[^a-z.]/.test(name)) return fehler('Ungültiger Buchstabe / Zeichen');

    return $.ajax({
      url: '../scripts/register.php',
      method: 'POST',
      data: $('#regForm').serialize()
    })
      .done(data => {
        if (data === 'Erfolgreich registriert') info(data);
        else fehler(data);
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });

  // Login:
  if (window.location.hash === '#expire') {
    fehler('Sitzung abgelaufen, bitte neu anmelden.');
    window.history.replaceState(null, null, ' ');
  }

  if (window.location.hash === '#neu') {
    fehler('Lass deinen Account von deinem Stationsleiter bestätigen.');
    window.history.replaceState(null, null, ' ');
  }

  if (window.location.hash === '#verlaufen') {
    fehler('Du bist nicht angemeldet.');
    window.history.replaceState(null, null, ' ');
  }
});
