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
  // AUTOCOMPLETE - Station / source: stationNamen, alleNamen / id="autocomplete"
});
// eslint-disable-next-line
new autoComplete({
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
  threshold: 1,
  // debounce: 100,
  searchEngine: 'loose',
  // resultsList: {
  //   // Rendered results list object      | (Optional)
  //   render: true,
  //   container: source => {
  //     const resultsListID = 'food_List';
  //     return resultsListID;
  //   },
  //   destination: document.querySelector('#autoComplete'),
  //   position: 'afterend',
  //   element: 'ul'
  // },
  maxResults: 5,
  highlight: true, // Highlight matching results      | (Optional)
  resultItem: {
    // Rendered result item            | (Optional)
    content: (data, source) => {
      source.innerHTML = data.match;
    },
    element: 'li'
  },
  noResults: () => {
    // Action script on noResults      | (Optional)
    const result = document.createElement('li');
    result.setAttribute('class', 'no_result');
    result.setAttribute('tabindex', '1');
    result.innerHTML = 'No Results';
    document.querySelector('#autoComplete_list').appendChild(result);
  },
  onSelection: feedback => {
    // Action script onSelection event | (Optional)
    console.log(feedback.selection.value.image_url);
  }
});
