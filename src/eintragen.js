import { roundTF, info, fehler } from './funktionen';

const moment = require('moment');

moment.locale('de');

let alleAH = [];
let stationNamen = [];
let alleNamen = [];
let aushilfenId;
let ausName;
let datum;
let beginnForm;
let endeForm;
let diff;
let gehalt;
let ahStation;

$.get('../scripts/getdata.php', data => {
  const daten = JSON.parse(data);
  alleAH = daten.alleDaten;
  stationNamen = daten.stationNamen;
  alleNamen = daten.alleNamen;
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
  // Input name, je nachdem ob der normale leer ist
  if ($('#nameInput').val() !== '') {
    ausName = $('#nameInput').val();
  } else {
    ausName = $('#alleInput').val();
  }

  // Station der Aushilfe
  ahStation = alleAH[ausName].station;

  // Check ob Aushilfe existiert
  if (!alleAH[ausName]) {
    fehler('Aushilfe nicht gefunden!'); // definiert in main.js
    return;
  }

  aushilfenId = alleAH[ausName].id;

  $('#etext').html(`<p><strong>Name:</strong> ${ausName}</p>`);

  const { norlohn } = alleAH[ausName];
  const { samlohn } = alleAH[ausName];
  const { sonlohn } = alleAH[ausName];
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
    fehler('Beginn und Ende überprüfen!'); // definiert in main.js
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
  // checkbox andere Station
  $('#stationCheck').change(() => {
    if (this.checked) {
      $('#nameInput').hide();
      $('#alleInput').show();
      $('#nameInput, #alleInput').val('');
    } else {
      $('#nameInput').show();
      $('#alleInput').hide();
      $('#nameInput, #alleInput').val('');
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
});

$(document).ready(() => {
  // AUTOCOMPLETE - Station
  $('#nameInput').autoComplete({
    minChars: 1,
    delay: 0,
    source(term, suggest) {
      term = term.toLowerCase();
      let matches = [];
      for (let i = 0; i < stationNamen.length; i++)
        if (~stationNamen[i].toLowerCase().indexOf(term))
          matches.push(stationNamen[i]);
      suggest(matches);
    }
  });

  // AUTOCOMPLETE - Alle
  $('#alleInput').autoComplete({
    minChars: 1,
    delay: 0,
    source(term, suggest) {
      term = term.toLowerCase();
      let matches = [];
      for (let i = 0; i < alleNamen.length; i++)
        if (~alleNamen[i].toLowerCase().indexOf(term))
          matches.push(alleNamen[i]);
      suggest(matches);
    }
  });
});
