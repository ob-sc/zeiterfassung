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
  if (window.location.hash === '#exists') {
    $('#fehlerAlert').show();
    $('#fehlerText').html('<strong>Benutzername existiert bereits!</strong>');
    window.history.replaceState(null, null, ' ');
  }
  // Erfolg
  if (window.location.hash === '#regsuccess') {
    $('#erfolgAlert').show();
    $('#erfolgText').html('<strong>Erfolgreich registriert!</strong>');
    window.history.replaceState(null, null, ' ');
  }
});
