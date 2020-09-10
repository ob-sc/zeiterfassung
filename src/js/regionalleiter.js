import {
  session,
  getData,
  createAutoComplete,
  roundTF,
  info,
  fehler,
  addCurrent,
  zuStunden
} from './funktionen';

import stationen from './stationen';

const moment = require('moment');

moment.locale('de');

let alleDaten;
let notdienst = false;
let station;

const deleteReq = (id, mode, dom) => {
  $.ajax({
    url: '../api/zdelete.php',
    method: 'POST',
    data: { id, mode }
  })
    .done(() => {
      if (mode === 2) info('Zeit nicht gelöscht');
      if (mode === 3) info('Zeit gelöscht');

      dom.remove();
    })
    .fail(data => {
      fehler(data.responseText);
    });
};

session('gbl', data => {
  station = parseInt(data.stationID, 10);
  const { region } = data;

  // get all stations in region
  const regionStationen = [];

  stationen.forEach((value, key) => {
    value.region.forEach(reg => {
      if (reg === region) {
        regionStationen.push(key);
      }
    });
  });

  // get delete requests in region
  $.ajax({
    url: '../api/zgetdelete.php',
    method: 'POST',
    data: { regionStationen }
  })
    .done(zReqRes => {
      const reqs = JSON.parse(zReqRes);

      if (reqs.length !== 0) {
        // create table element
        const table = document.createElement('table');
        table.setAttribute('style', 'width: 100%');
        table.classList.add('table', 'table-hover', 'table-sm');
        document.querySelector('.container-right').appendChild(table);

        // index for table
        let i = 0;

        // create row in preview
        const createRow = (position, id, tableData) => {
          const row = table.insertRow(position);
          const cell0 = row.insertCell(0);
          const cell1 = row.insertCell(1);
          const cell2 = row.insertCell(2);
          const cell3 = row.insertCell(3);
          const cell4 = row.insertCell(4);
          const cell5 = row.insertCell(5);
          const cell6 = row.insertCell(6);
          const cell7 = row.insertCell(7);
          const cell8 = row.insertCell(8);
          const cell9 = row.insertCell(9);
          const cell10 = row.insertCell(10);
          const cell11 = row.insertCell(11);
          const cell12 = row.insertCell(12);
          const cell13 = row.insertCell(13);

          cell0.innerHTML = id;
          cell1.innerHTML = tableData.station;
          cell2.innerHTML = moment(
            tableData.req_reg,
            'YYYY-MM-DD HH:mm:ss'
          ).format('DD.MM.YYYY');
          cell3.innerHTML = tableData.user;
          cell4.innerHTML = tableData.name;
          cell5.innerHTML = moment(tableData.datum, 'YYYY-MM-DD').format(
            'DD.MM.YYYY'
          );
          cell6.innerHTML = tableData.beginn;
          cell7.innerHTML = tableData.ende;
          cell8.innerHTML = zuStunden(tableData.arbeitszeit);
          cell9.innerHTML = roundTF(tableData.gehalt);
          cell10.innerHTML = tableData.disponent;
          cell11.innerHTML = moment(
            tableData.zeit_reg,
            'YYYY-MM-DD HH:mm:ss'
          ).format('DD.MM.YYYY');

          cell12.innerHTML = 'Ja';
          cell12.classList.add('delete');
          cell12.addEventListener('click', () => {
            deleteReq(tableData.zeitid, 3, row);
          });

          cell13.innerHTML = 'Nein';
          cell13.classList.add('delete');
          cell13.addEventListener('click', () => {
            deleteReq(tableData.zeitid, 2, row);
          });

          i += 1;
        };

        // loop through all reqs
        Object.entries(reqs).forEach(([key, val]) => {
          createRow(i, key, val);
        });

        // table header
        const header = table.createTHead();
        const row = header.insertRow(0);
        const hCell0 = row.insertCell(0);
        hCell0.innerHTML = 'ID';
        const hCell1 = row.insertCell(1);
        hCell1.innerHTML = 'Station';
        const hCell2 = row.insertCell(2);
        hCell2.innerHTML = 'Anfrage vom';
        const hCell3 = row.insertCell(3);
        hCell3.innerHTML = 'Anfrage von';
        const hCell4 = row.insertCell(4);
        hCell4.innerHTML = 'Aushilfe';
        const hCell5 = row.insertCell(5);
        hCell5.innerHTML = 'Schicht am';
        const hCell6 = row.insertCell(6);
        hCell6.innerHTML = 'Beginn';
        const hCell7 = row.insertCell(7);
        hCell7.innerHTML = 'Ende';
        const hCell8 = row.insertCell(8);
        hCell8.innerHTML = 'AZ';
        const hCell9 = row.insertCell(9);
        hCell9.innerHTML = 'Gehalt';
        const hCell10 = row.insertCell(10);
        hCell10.innerHTML = 'Eintrag von';
        const hCell11 = row.insertCell(11);
        hCell11.innerHTML = 'Eintrag am';
        const hCell12 = row.insertCell(12);
        hCell12.setAttribute('colspan', '2');
        hCell12.innerHTML = 'Löschen';
        row.style.fontWeight = 'bold';
      } else {
        document.querySelector('.container-right').innerHTML =
          'Keine Einträge zum Löschen vorhanden.';
        document.querySelector('.container-right').style.textAlign = 'center';
      }
    })
    .fail(zReqRes => {
      fehler(zReqRes.responseText);
    });
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

  // Wenn Köln-Renault (41) dann am Wochenende pauschal 12€
  if (station === 41 && moments.date.isoWeekday() >= 6) {
    lohn = 12;
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

  if (inputs.name === '' || alleDaten[inputs.name] === undefined)
    return fehler('Aushilfe nicht gefunden');

  // moment objects to pass to other functions
  const moments = {
    date: moment(inputs.date, 'YYYY-MM-DD'),
    start: moment(inputs.start, 'HH:mm'),
    end: moment(inputs.end, 'HH:mm')
  };

  sendData.name = inputs.name;
  sendData.ahstation = alleDaten[inputs.name].station;
  sendData.ahmax = alleDaten[inputs.name].ahStatus;
  sendData.ahid = alleDaten[inputs.name].id;
  sendData.date = moments.date.format('YYYY-MM-DD');
  sendData.start = moments.start.format('HH:mm');
  sendData.end = moments.end.format('HH:mm');

  if (!notdienst && !moments.end.isAfter(moments.start))
    return fehler('Beginn und Ende überprüfen (negative Arbeitszeit)');

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

  // ¯\_(ツ)_/¯
  if (pause === 1)
    sendData.end = moments.end.add(30, 'minutes').format('HH:mm');
  else if (pause === 2)
    sendData.end = moments.end.add(45, 'minutes').format('HH:mm');

  return $.ajax({
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
      $('#start, #end').removeAttr('required');
      notdienst = true;
    } else {
      $('#timegroup').show();
      $('#menge').hide();
      $('#start, #end').prop('required', true);
      notdienst = false;
    }
  });
});
