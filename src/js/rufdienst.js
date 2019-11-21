import { getData, createAutoComplete, info, fehler } from './funktionen';

const moment = require('moment');

moment.locale('de');

$(document).ready(() => {
  getData(daten => {
    createAutoComplete('#notdienstAuto', daten.alleNamen);
  });

  $('#ndform').submit(e => {
    e.preventDefault();
    $.ajax({
      url: '.php',
      method: 'POST',
      data: $('#ndform').serialize()
    })
      .done(data => {
        info(data);
        $('#ndform')[0].reset();
        document.getElementById('datum').valueAsDate = new Date();
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });
});
