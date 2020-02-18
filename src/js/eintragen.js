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
let abmeldung; // todo weg?
let station;

session('norm', data => {
  station = parseInt(data.stationID, 10);
});

// '19.12.2020', 'DD.MM.YYYY'

// calculate maximum from previous / current month

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
      if (abmeldung) {
        $.ajax({
          url: '../api/signIn.php',
          method: 'POST',
          data: { deleteid: abmeldung.dataset.id }
        })
          .done(() => {
            abmeldung.remove();
            abmeldung = false;
          })
          .fail(deletedata => {
            fehler(deletedata.responseText);
          });
      }
    })
    .fail(data => {
      fehler(data.responseText);
    });
};

const calcAZ = (name, moments) => {
  const calc = {};

  const { norlohn } = alleDaten[name];
  const { samlohn } = alleDaten[name];
  const { sonlohn } = alleDaten[name];

  const diff = moments.end.diff(moments.start, 'minutes');

  // validate az
  if (diff < 1) return false;

  calc.az = diff;

  // pausenzeit
  if (diff > 360) calc.az -= 30;
  if (diff > 540) calc.az -= 15;

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

  // gehalt in cent
  const gehaltCent = (lohn * 100 * calc.az) / 60 / 100;

  calc.gehalt = roundTF(gehaltCent);

  return calc;
};

const createPreview = (data, event) => {
  clearDOM('.preview');

  const confirmBtn = document.getElementById('confirm');
  const deleteBtn = document.getElementById('delete');
  const preview = document.querySelector('.preview');

  const sendData = {};

  const endInput = document.getElementById('end');

  const moments = {
    date: moment(data.date, 'YYYY-MM-DD'),
    start: moment(data.start, 'HH:mm:ss'),
    end: moment(endInput.value, 'HH:mm')
  };

  sendData.date = moments.date.format('DD.MM.YYYY');
  sendData.start = moments.start.format('HH:mm');
  sendData.end = endInput.value;

  // if (notdienst) {
  //   fbData.beginnForm = 'nd';
  //   fbData.endeForm = 'nd';
  //   fbData.diff = 0;

  //   const menge = $('#anzahl').val();
  //   $('#etext').append(`<p><strong>Einsätze:</strong> ${menge}</p>`);

  //   fbData.gehalt = 40 * menge;
  //   $('#etext').append(`<p><strong>Gehalt:</strong> ${fbData.gehalt}€</p>`);
  // }

  const calc = calcAZ(data.name, moments);
  sendData.az = calc.az;
  sendData.gehalt = calc.gehalt;

  sendData.ahid = data.ahid;

  const table = document.createElement('table');
  table.setAttribute('style', 'width: 100%');
  preview.appendChild(table);

  const createRow = (position, id, text0, text1) => {
    const row = table.insertRow(position);
    const cell0 = row.insertCell(0);
    const cell1 = row.insertCell(1);

    cell1.setAttribute('id', id);

    cell0.innerHTML = text0;
    cell1.innerHTML = text1;
  };

  createRow(0, 'nameCell', 'Name', data.name);
  createRow(1, 'dateCell', 'Datum', sendData.date);
  createRow(2, 'startCell', 'Beginn', sendData.start);
  createRow(3, 'endCell', 'Ende', sendData.end);

  if (!notdienst) {
    if (moments.end.isAfter(moments.start)) {
      createRow(4, 'azCell', 'Arbeitszeit', zuStunden(sendData.az));
      createRow(5, 'gehaltCell', 'Gehalt', `${sendData.gehalt}€`);

      confirmBtn.value = 'Abmelden';
      deleteBtn.style.display = 'block';
    } else {
      createRow(4, 'azCell', 'Arbeitszeit', 'Fehler');
      createRow(5, 'gehaltCell', 'Gehalt', 'Fehler');

      confirmBtn.style.display = 'none';
      deleteBtn.style.display = 'block';
    }
  }

  if (alleDaten[data.name].ahStatus !== 'Student') {
    createRow(6, 'monthCell', 'Monat', '');
    createRow(7, 'yearCell', 'Jahr', '');
  }

  const calcMax = statusMax => {
    const today = moment().format('DD');

    // abrechnungsmonate
    let months = 1;

    // erster tag im abrechnungszeitraum des jahres
    let firstDayYear = `${moment().format('YYYY')}-12-18`;

    // wenn firstDayYear in der Zukunft liegt
    if (moment().isBefore(moment(firstDayYear, 'YYYY-MM-DD'))) {
      firstDayYear = `${moment()
        .subtract(1, 'years')
        .format('YYYY')}-12-18`;
    }

    // erster tag im aktuellen Abrechnungszeitraum
    let firstDayMonth = '';

    // wenn tag größer ist als 17, der monat also vor dem abrechnungszeitraumsmonat ist
    if (today > 17) {
      firstDayMonth = `${moment().format('YYYY-MM')}-18`;
      months += 1;
    }

    // wenn tag kleiner ist als 18, der monat also im abrechnungszeitraumsmonat ist
    if (today < 18) {
      firstDayMonth = `${moment()
        .subtract(1, 'months')
        .format('YYYY-MM')}-18`;
    }

    // todo testen 2x subtract
    // wenn tag kleiner ist als 18, der monat also im abrechnungszeitraumsmonat ist und der monat januar ist
    if (today < 18 && moment().format('MM') === '01') {
      firstDayMonth = `${moment()
        .subtract(1, 'years')
        .subtract(1, 'months')
        .format('YYYY-MM')}-18`;
    }

    // monate seit anfang des jahres addieren
    const mdiff = moment().diff(moment().startOf('year'), 'months');
    months += mdiff;

    // wenn zwischen 18.12. und 31.12. => 1 monat
    const bs = moment(`${moment().format('YYYY')}-12-17`, 'YYYY-MM-DD');
    const be = moment(`${moment().format('YYYY')}-12-31`, 'YYYY-MM-DD');
    if (moment().isBetween(bs, be)) months = 1;

    const maxYear = statusMax * months;

    $.ajax({
      url: '../api/gehaltMax.php',
      method: 'POST',
      data: {
        ahid: data.ahid,
        firstDayMonth,
        firstDayYear
      }
    })
      .done(maxData => {
        const res = JSON.parse(maxData);

        const month = Number(res.month) + Number(sendData.gehalt);
        const year = Number(res.year) + Number(sendData.gehalt);

        const checkM = statusMax - month;
        const checkY = maxYear - year;

        document.getElementById('monthCell').innerHTML = `${roundTF(checkM)}€`;
        document.getElementById('yearCell').innerHTML = `${roundTF(checkY)}€`;

        if (checkY >= 0) {
          confirmBtn.style.display = 'block';
        }
      })
      .fail(maxData => {
        fehler(maxData.responseText);
      });
  };

  const gehaltStatus = Number(alleDaten[data.name].ahStatus);
  if (alleDaten[data.name].ahStatus !== 'Student') {
    if (Number.isNaN(gehaltStatus))
      fehler('Fehler, bitte überprüfe den Status unter "Aushilfen"');
    calcMax(gehaltStatus);
  }

  endInput.addEventListener('change', e => {
    sendData.end = e.target.value;
    moments.end = moment(sendData.end, 'HH:mm');
    document.getElementById('endCell').innerHTML = sendData.end;

    if (moments.end.isAfter(moments.start)) {
      const newCalc = calcAZ(data.name, moments);

      sendData.az = newCalc.az;
      sendData.gehalt = newCalc.gehalt;

      document.getElementById('azCell').innerHTML = zuStunden(sendData.az);
      document.getElementById('gehaltCell').innerHTML = `${sendData.gehalt}€`;

      if (alleDaten[data.name].ahStatus !== 'Student') {
        confirmBtn.style.display = 'none';
        calcMax(gehaltStatus);
      } else {
        confirmBtn.style.display = 'block';
      }

      confirmBtn.value = 'Abmelden';
      deleteBtn.style.display = 'block';
    } else {
      document.getElementById('azCell').innerHTML = 'Fehler';
      document.getElementById('gehaltCell').innerHTML = 'Fehler';

      if (alleDaten[data.name].ahStatus !== 'Student') {
        document.getElementById('monthCell').innerHTML = 'Fehler';
        document.getElementById('yearCell').innerHTML = 'Fehler';
      }

      confirmBtn.style.display = 'none';
    }
  });

  deleteBtn.onclick = () => {
    $.ajax({
      url: '../api/signIn.php',
      method: 'POST',
      data: { deleteid: data.id }
    })
      .done(() => {
        event.target.remove();
      })
      .fail(failData => {
        fehler(failData.responseText);
      });
  };
};

const toggleSelect = (event, data) => {
  const signedIn = document.querySelectorAll('.signedIn');
  document.getElementById('confirm').style.display = 'none';
  document.getElementById('delete').style.display = 'none';

  signedIn.forEach(element => {
    element.classList[event.target === element ? 'toggle' : 'remove'](
      'selectedSI'
    );
  });

  if (event.target.classList.contains('selectedSI')) {
    document.getElementById('endGroup').style.display = 'block';
    createPreview(data, event);
  } else {
    clearDOM('.preview');
    document.getElementById('endGroup').style.display = 'none';
  }
};

const listSignedIn = data => {
  // remove all dom elements in main container to prevent duplicate entries
  clearDOM('.eintragen-main');

  // loop through array of db entries
  data.forEach(element => {
    // create new div
    const newSI = document.createElement('div');
    newSI.innerHTML = element.name;
    newSI.setAttribute('class', 'signedIn');
    if (!moment(element.date).isSame(moment(), 'day'))
      newSI.classList.add('wrongDate');
    newSI.addEventListener('click', e => {
      toggleSelect(e, element);
    });

    // append div to document
    document.querySelector('.eintragen-main').appendChild(newSI);
  });
};

const signIn = () => {
  const signInData = {};

  // name from form
  // todo irgendwann hier mit alleDaten die id holen und eintragen
  signInData.name = document.getElementById('eintragenAuto').value;

  // validate name
  if (!alleDaten[signInData.name]) return fehler('Aushilfe nicht gefunden!');

  // loop through all signed in ah to check if it is already signed id
  // using for loop instead of forEach because forEach doesn't return
  const allSignedIn = document.querySelectorAll('.signedIn');
  for (let i = 0; i < allSignedIn.length; i += 1) {
    if (allSignedIn[i].innerHTML === signInData.name)
      return fehler('Aushilfe ist bereits angemeldet.');
  }

  // aushilfen id
  signInData.id = alleDaten[signInData.name].id;

  // date = today, mySQL date format
  signInData.date = moment().format('YYYY-MM-DD');

  // start from form
  const startInput = document.getElementById('start').value;

  // convert to mySQL time format
  signInData.start = moment(startInput, 'HH:mm').format('HH:mm:ss');

  // todo fetch API statt ajax
  return $.ajax({
    url: '../api/signIn.php',
    method: 'POST',
    data: { signInData }
  })
    .done(data => {
      const signedIn = JSON.parse(data);
      // list signed in AH
      listSignedIn(signedIn);
    })
    .fail(data => {
      fehler(data.responseText);
    });
};

document.addEventListener('DOMContentLoaded', () => {
  addCurrent('eintragen');

  document.getElementById('start').value = moment().format('HH:mm');
  document.getElementById('end').value = moment().format('HH:mm');

  getData(daten => {
    alleDaten = daten.alleDaten;
    createAutoComplete('#eintragenAuto', daten.stationNamen, daten.alleNamen);
  });

  $.getJSON('../api/signIn.php').done(data => {
    listSignedIn(data);
  });

  document.getElementById('signInForm').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('fehlerAlert').style.display = 'none';
    document.getElementById('infoAlert').style.display = 'none';
    signIn();
  });
});

$(document).ready(() => {
  $('#ndCheck').change(e => {
    if (e.currentTarget.checked === true) {
      $('.zeit').hide();
      $('#menge').show();
      notdienst = true;
    } else {
      $('.zeit').show();
      $('#menge').hide();
      notdienst = false;
    }
  });
});
