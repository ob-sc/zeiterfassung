import { createAutoComplete, roundTF, info, fehler } from './funktionen';
import dataJSON from './request';

const moment = require('moment');

moment.locale('de');

let alleDaten;
let aushilfenId;
let ausName;
let datum;
let beginnForm;
let endeForm;
let diff;
let gehalt;
let ahStation;

$(document).ajaxComplete(() => {
  alleDaten = dataJSON.responseJSON.alleDaten;
  const { stationNamen } = dataJSON.responseJSON;
  const { alleNamen } = dataJSON.responseJSON;
  createAutoComplete('#eintragenAuto', stationNamen, alleNamen);
  console.log('alle ajax eintragen');
});

window.senden = () => {
  $.ajax({
    url: 'send.php',
    method: 'POST',
    data: {
      aushilfenId,
      ausName,
      datum,
      beginnForm, // Beginn und Ende müssen rein wegen Tabelle Einzelauswertung
      endeForm,
      diff,
      gehalt,
      ahStation
    }
  })
    .done(data => {
      info(data);
      $('#eform')[0].reset();
      document.getElementById('datum').valueAsDate = new Date();
    })
    .fail(data => {
      fehler(data.responseText);
    });

  $('#esend').hide();
};

function formBerechnung() {
  ausName = $('#autoComplete').val();

  // Station der Aushilfe
  ahStation = alleDaten[ausName].station;

  // Check ob Aushilfe existiert
  if (!alleDaten[ausName]) {
    fehler('Aushilfe nicht gefunden!');
    return;
  }

  aushilfenId = alleDaten[ausName].id;

  $('#etext').html(`<p><strong>Name:</strong> ${ausName}</p>`);

  const { norlohn } = alleDaten[ausName];
  const { samlohn } = alleDaten[ausName];
  const { sonlohn } = alleDaten[ausName];
  let lohn;

  datum = $('#datum').val();
  $('#etext').append(
    `<p><strong>Datum:</strong> ${moment(datum).format('DD.MM.YYYY')}</p>`
  );

  // Check ob Datum in der Zukunft ist
  if (moment(datum).isAfter(new Date(), 'day') === true) {
    $('#fehlerText').html('<strong>Datum ist in der Zukunft!</strong>');
    $('#fehlerAlert').show();
    return;
  }

  $('#etext').append(
    `<p><strong>Wochentag:</strong> ${moment(datum).format('dddd')}</p>`
  );

  const beginn = moment($('#beginn').val(), 'HH:mm');
  beginnForm = moment(beginn).format('HH:mm');
  $('#etext').append(`<p><strong>Beginn:</strong> ${beginnForm}</p>`);

  const ende = moment($('#ende').val(), 'HH:mm');
  endeForm = moment(ende).format('HH:mm');
  $('#etext').append(`<p><strong>Ende:</strong> ${endeForm}</p>`);

  diff = ende.diff(beginn, 'minutes');
  $('#etext').append(
    `<p><strong>Arbeitszeit:</strong> ${moment
      .utc(ende.diff(beginn))
      .format('HH:mm')}</p>`
  );

  // Check ob AZ 0 oder negativ
  if (diff < 1) {
    fehler('Beginn und Ende überprüfen!');
    return;
  }

  // Gehalt
  if (moment(datum).isoWeekday() === 7) {
    lohn = sonlohn;
  } else if (moment(datum).isoWeekday() === 6) {
    lohn = samlohn;
  } else {
    lohn = norlohn;
  }
  // Berechnung in Cent, da sonst falsch gerundet wird
  const gehaltNoRund = (lohn * 100 * diff) / 60 / 100;
  gehalt = roundTF(gehaltNoRund);
  $('#etext').append(`<p><strong>Gehalt:</strong> ${gehalt}€</p>`);

  // senden knopf zeigen
  $('#esend').show();
}

$(document).ready(() => {
  $('#eform').submit(e => {
    e.preventDefault();
    $('#fehlerAlert').hide();
    $('#infoAlert').hide();
    formBerechnung();
  });

  $('#eform').change(() => {
    $('#esend').hide();
  });
});
