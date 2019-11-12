import { roundTF, info, fehler } from './funktionen';

const moment = require('moment');
const autoComplete = require('@tarekraafat/autocomplete.js/dist/js/autoComplete');

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

// AUTOCOMPLETE - Station / source: stationNamen, alleNamen / id="autocomplete"
function createAutoComplete() {
  document.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line
    const autoCompleteInput = new autoComplete({
      data: {
        src: stationNamen,
        cache: true
      },
      sort: (a, b) => {
        if (a.match < b.match) return -1;
        if (a.match > b.match) return 1;
        return 0;
      },
      selector: '#autoComplete',
      threshold: 0,
      searchEngine: 'strict', // todo strict oder loose?
      resultsList: {
        render: true,
        position: 'afterend'
      },
      maxResults: 6,
      highlight: true,
      noResults: () => {
        const result = document.createElement('li');
        result.setAttribute('class', 'autoComplete_result');
        result.setAttribute('tabindex', '1');
        result.innerHTML = 'Kein Ergebnis';
        document.querySelector('#autoComplete_list').appendChild(result);
      },
      onSelection: feedback => {
        document.querySelector('#autoComplete').blur();
        const selection = feedback.selection.value;
        document.querySelector('#autoComplete').value = selection;
      }
    });

    ['focus', 'blur'].forEach(eventType => {
      const resultsList = document.querySelector('#autoComplete_list');

      document
        .querySelector('#autoComplete')
        .addEventListener(eventType, () => {
          if (eventType === 'blur') {
            resultsList.style.display = 'none';
          } else if (eventType === 'focus') {
            resultsList.style.display = 'block';
          }
        });
    });

    // eslint-disable-next-line func-names
    $('#stationCheck').change(function() {
      $('#autoComplete').val('');
      if (this.checked) {
        autoCompleteInput.data = {
          src: alleNamen,
          cache: true
        };
        autoCompleteInput.dataStream = alleNamen;
      } else {
        autoCompleteInput.data = {
          src: stationNamen,
          cache: true
        };
        autoCompleteInput.dataStream = stationNamen;
      }
    });
  });
}

$.get('../scripts/getdata.php', data => {
  const daten = JSON.parse(data);
  alleAH = daten.alleDaten;
  stationNamen = daten.stationNamen;
  alleNamen = daten.alleNamen;
}).done(() => {
  createAutoComplete(stationNamen);
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
  ahStation = alleAH[ausName].station;

  // Check ob Aushilfe existiert
  if (!alleAH[ausName]) {
    fehler('Aushilfe nicht gefunden!');
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
