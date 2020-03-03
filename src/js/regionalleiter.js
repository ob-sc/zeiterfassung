import {
  session,
  getData,
  createAutoComplete,
  roundTF,
  info,
  fehler,
  clearDOM,
  addCurrent,
  zuStunden
} from './funktionen';

const moment = require('moment');

moment.locale('de');

let alleDaten;
let notdienst = false;
let station;

session('bgl', data => {
  station = parseInt(data.stationID, 10);
});

const calcAZ = (name, moments) => {
  const calc = {};

  const { norlohn } = alleDaten[name];
  const { samlohn } = alleDaten[name];
  const { sonlohn } = alleDaten[name];

  calc.diff = moments.end.diff(moments.start, 'minutes');

  // validate az
  if (calc.diff < 1) return false;

  calc.az = calc.diff;

  // no pause, nothing added
  calc.pause = 0;

  // pausenzeit
  // 30 mins, pause is 1
  if (calc.diff >= 360) {
    calc.az -= 30;
    calc.pause = 1;
  }
  // 45 mins, pause = 2
  if (calc.diff >= 540) {
    calc.az -= 15;
    calc.pause = 2;
  }

  // Gehalt
  let lohn;
  if (moments.date.isoWeekday() === 7) {
    lohn = sonlohn;
  } else if (moments.date.isoWeekday() === 6) {
    lohn = samlohn;
  } else {
    lohn = norlohn;
  }
  // Wenn Berlin Tiergarten (020) dann am Montag pauschal 10€
  if (station === 20 && moments.date.isoWeekday() === 1) {
    lohn = 10;
  }

  // gehalt in cent / rundungsfehler vermeiden
  const gehaltCent = (lohn * 100 * calc.diff) / 60 / 100;

  calc.gehalt = roundTF(gehaltCent);

  return calc;
};

const eintragen = () => {
  const sendData = {};

  // pause var
  let pause = 0;

  const inputs = {
    name: document.getElementById('eintragenAuto').value,
    date: document.getElementById('date').value,
    start: document.getElementById('start').value,
    end: document.getElementById('end').value
  };

  // moment objects to pass to other functions
  const moments = {
    date: moment(inputs.date, 'YYYY-MM-DD'),
    start: moment(inputs.start, 'HH:mm'),
    end: moment(inputs.end, 'HH:mm')
  };

  sendData.name = inputs.name;
  sendData.ahstation = alleDaten[inputs.name].station;
  sendData.ahid = alleDaten[inputs.name].id;
  sendData.date = moments.date.format('YYYY-MM-DD');
  sendData.start = moments.start.format('HH:mm');
  sendData.end = moments.end.format('HH:mm');

  if (!notdienst) {
    // calculate az and gehalt with moments => change moments everytime we need a new calc
    const calc = calcAZ(inputs.name, moments);
    pause = calc.pause;
    sendData.diff = calc.diff;
    sendData.gehalt = calc.gehalt;
  }

  if (notdienst) {
    sendData.start = 'nd';
    sendData.end = 'nd';
    sendData.diff = 0;

    const amount = document.getElementById('anzahl').value;
    sendData.gehalt = 40 * amount;
  }

  $.ajax({
    url: '../api/send.php',
    method: 'POST',
    data: sendData
  })
    .done(sendRes => {
      info(sendRes);
    })
    .fail(sendRes => {
      fehler(sendRes.responseText);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  // navbar current
  addCurrent('regionalleiter');

  // all ah data
  getData(daten => {
    alleDaten = daten.alleDaten;
    createAutoComplete('#eintragenAuto', daten.stationNamen, daten.alleNamen);
  });

  // on eintragen submit
  document.getElementById('eform').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('fehlerAlert').style.display = 'none';
    document.getElementById('infoAlert').style.display = 'none';
    eintragen();
  });

  // todo in vanilla js umschreiben siehe eintragen.js
  $('#ndCheck').change(e => {
    if (e.currentTarget.checked === true) {
      $('#timegroup').hide();
      $('#menge').show();
      $('#beginn, #ende').removeAttr('required');
      notdienst = true;
    } else {
      $('#timegroup').show();
      $('#menge').hide();
      $('#beginn, #ende').prop('required', true);
      notdienst = false;
    }
  });
});
