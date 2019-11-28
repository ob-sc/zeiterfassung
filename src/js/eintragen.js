import {
  session,
  getData,
  createAutoComplete,
  roundTF,
  info,
  fehler
} from './funktionen';

const moment = require('moment');

moment.locale('de');

session();

let alleDaten;

const fbData = {};

window.senden = () => {
  $.ajax({
    url: '../api/send.php',
    method: 'POST',
    data: fbData
  })
    .done(data => {
      info(data);
      $('#eform')[0].reset();
      document.getElementById('datum').valueAsDate = new Date();
      $('#etext').html('');
    })
    .fail(data => {
      fehler(data.responseText);
    });

  $('#esend').hide();
};

function formBerechnung() {
  const ausName = $('#eintragenAuto').val();
  fbData.ausName = ausName;

  // Check ob Aushilfe existiert
  if (!alleDaten[ausName]) {
    fehler('Aushilfe nicht gefunden!');
    return;
  }

  // Station der Aushilfe
  fbData.ahStation = alleDaten[ausName].station;

  fbData.aushilfenId = alleDaten[ausName].id;

  $('#etext').html(`<p><strong>Name:</strong> ${ausName}</p>`);

  const { norlohn } = alleDaten[ausName];
  const { samlohn } = alleDaten[ausName];
  const { sonlohn } = alleDaten[ausName];
  let lohn;

  fbData.datum = $('#datum').val();
  // prettier-ignore
  $('#etext').append(`<p><strong>Datum:</strong> ${moment(fbData.datum).format('DD.MM.YYYY')}</p>`);

  // Check ob Datum in der Zukunft ist
  if (moment(fbData.datum).isAfter(new Date(), 'day') === true) {
    $('#fehlerText').html('<strong>Datum ist in der Zukunft!</strong>');
    $('#fehlerAlert').show();
    return;
  }

  $('#etext').append(
    `<p><strong>Wochentag:</strong> ${moment(fbData.datum).format('dddd')}</p>`
  );

  const beginn = moment($('#beginn').val(), 'HH:mm');
  fbData.beginnForm = moment(beginn).format('HH:mm');
  $('#etext').append(`<p><strong>Beginn:</strong> ${fbData.beginnForm}</p>`);

  const ende = moment($('#ende').val(), 'HH:mm');
  fbData.endeForm = moment(ende).format('HH:mm');
  $('#etext').append(`<p><strong>Ende:</strong> ${fbData.endeForm}</p>`);

  fbData.diff = ende.diff(beginn, 'minutes');
  // prettier-ignore
  $('#etext').append(`<p><strong>Arbeitszeit:</strong> ${moment.utc(ende.diff(beginn)).format('HH:mm')}</p>`);

  // Check ob AZ 0 oder negativ
  if (fbData.diff < 1) {
    fehler('Beginn und Ende überprüfen!');
    return;
  }

  // Gehalt
  if (moment(fbData.datum).isoWeekday() === 7) {
    lohn = sonlohn;
  } else if (moment(fbData.datum).isoWeekday() === 6) {
    lohn = samlohn;
  } else {
    lohn = norlohn;
  }
  // Berechnung in Cent, da sonst falsch gerundet wird
  const gehaltNoRund = (lohn * 100 * fbData.diff) / 60 / 100;
  fbData.gehalt = roundTF(gehaltNoRund);
  $('#etext').append(`<p><strong>Gehalt:</strong> ${fbData.gehalt}€</p>`);

  // senden knopf zeigen
  $('#esend').show();
}

$(document).ready(() => {
  $('nav li').removeClass('current');
  $('#eintragen').addClass('current');

  $('#ndCheck').change(e => {
    if (e.currentTarget.checked === true) {
      $('#zeit').hide();
      $('#menge').show();
    } else {
      $('#zeit').show();
      $('#menge').hide();
    }
  });

  $('#eform').submit(e => {
    e.preventDefault();
    $('#fehlerAlert').hide();
    $('#infoAlert').hide();
    formBerechnung();
  });

  $('#eform').change(() => {
    $('#esend').hide();
  });

  getData(daten => {
    alleDaten = daten.alleDaten;
    createAutoComplete('#eintragenAuto', daten.stationNamen, daten.alleNamen);
  });
});
