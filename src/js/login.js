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
