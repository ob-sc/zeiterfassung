import {
  session,
  getData,
  createAutoComplete,
  roundTF,
  info,
  fehler,
  clearDOM,
  addCurrent,
  zuStunden,
} from './funktionen';

const moment = require('moment');

moment.locale('de');

let alleDaten;
let notdienst = false;
let station;

session('norm', data => {
  station = parseInt(data.stationID, 10);
});

// todo klasse notdienst und normal oder so auf elemente => queryselector .notdienst => foreach style.display none oder halt block
const checkND = () => {
  // Toggle elements for notdienst
  document.querySelector('.zeit').style.display = 'none';
  document.getElementById('menge').style.display = 'block';
  document.getElementById('signIn').style.display = 'none';
  document.getElementById('ndPreview').style.display = 'block';

  // clear the preview
  clearDOM('.preview');
  document.getElementById('endGroup').style.display = 'none';
  document.getElementById('delete').style.display = 'none';
  document.getElementById('confirm').style.display = 'none';

  // remove selectedSI
  document.querySelectorAll('.signedIn').forEach(element => {
    element.classList.remove('selectedSI');
  });

  notdienst = true;
};

const unCheckND = () => {
  // Toggle elements for notdienst
  document.querySelector('.zeit').style.display = 'block';
  document.getElementById('menge').style.display = 'none';
  document.getElementById('signIn').style.display = 'block';
  document.getElementById('confirm').style.display = 'none';
  document.getElementById('ndPreview').style.display = 'none';

  document.getElementById('ndCheck').checked = false;

  clearDOM('.preview');

  notdienst = false;
};

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

const createPreview = (data, event) => {
  // delete previous preview
  clearDOM('.preview');

  // pause var
  let pause = 0;

  // assign ids
  const confirmBtn = document.getElementById('confirm');
  const deleteBtn = document.getElementById('delete');
  const preview = document.querySelector('.preview');
  const endInput = document.getElementById('end');

  const sendData = {};

  if (alleDaten[data.name] === undefined) {
    fehler('Aushilfe nicht gefunden');
    deleteBtn.style.display = 'block';
  }

  // remove entry from db and dom
  deleteBtn.onclick = () => {
    $.ajax({
      url: '../api/signIn.php',
      method: 'POST',
      data: { deleteid: data.id },
    })
      .done(() => {
        event.target.remove();
        clearDOM('.preview');
        document.getElementById('endGroup').style.display = 'none';
        document.getElementById('delete').style.display = 'none';
        document.getElementById('confirm').style.display = 'none';
      })
      .fail(failData => {
        fehler(failData.responseText);
      });
  };

  // moment objects to pass to other functions
  const moments = {
    date: moment(data.date, 'YYYY-MM-DD'),
    start: moment(data.start, 'HH:mm:ss'),
    end: moment(endInput.value, 'HH:mm'),
  };

  // prepare name, ahstation, date, start and end to pass to php
  sendData.name = data.name;
  sendData.ahstation = alleDaten[data.name].station;
  sendData.date = moments.date.format('YYYY-MM-DD');
  sendData.start = moments.start.format('HH:mm');
  sendData.end = endInput.value;

  // prepare id - doesn't change
  sendData.ahid = data.ahid;

  // create table element in preview
  const table = document.createElement('table');
  table.setAttribute('style', 'width: 100%');
  preview.appendChild(table);

  // index for table
  let i = 0;

  // create row in preview
  const createRow = (position, id, text0, text1) => {
    const row = table.insertRow(position);
    const cell0 = row.insertCell(0);
    const cell1 = row.insertCell(1);

    cell1.setAttribute('id', id);

    cell0.innerHTML = text0;
    cell1.innerHTML = text1;

    i += 1;
  };

  // create name row, always and doesn't change
  createRow(i, 'nameCell', 'Name', data.name);

  if (!notdienst) {
    confirmBtn.value = 'Abmelden';
    // calculate az and gehalt with moments => change moments everytime we need a new calc
    const calc = calcAZ(data.name, moments);
    pause = calc.pause;
    // display different az from db entry (pause)
    sendData.az = calc.az;
    sendData.diff = calc.diff;
    sendData.gehalt = calc.gehalt;

    createRow(i, 'dateCell', 'Datum', moments.date.format('DD.MM.YYYY'));
    createRow(i, 'startCell', 'Beginn', sendData.start);
    createRow(i, 'endCell', 'Ende', sendData.end);

    if (moments.end.isAfter(moments.start)) {
      createRow(i, 'azCell', 'Arbeitszeit', zuStunden(sendData.az));
      createRow(i, 'gehaltCell', 'Gehalt', `${sendData.gehalt}€`);

      deleteBtn.style.display = 'block';
    } else {
      createRow(i, 'azCell', 'Arbeitszeit', 'Fehler');
      createRow(i, 'gehaltCell', 'Gehalt', 'Fehler');

      confirmBtn.style.display = 'none';
      deleteBtn.style.display = 'block';
    }
  }

  if (notdienst) {
    sendData.start = 'nd';
    sendData.end = 'nd';
    sendData.diff = 0;

    const amount = document.getElementById('anzahl').value;
    sendData.gehalt = 40 * amount;

    createRow(i, 'amountCell', 'Menge', amount);
    createRow(i, 'gehaltCell', 'Gehalt', `${sendData.gehalt}€`);

    confirmBtn.value = 'Eintragen';
  }

  if (alleDaten[data.name].ahStatus !== 'Student') {
    createRow(i, 'monthCell', 'Monat', '');
    createRow(i, 'yearCell', 'Jahr', '');
  }

  // calculate max for month and year
  // dependencies:
  // ajax: data.ahid
  // monthcell und yearcell
  // moment end & start
  const calcMax = statusMax => {
    const today = moment().format('DD');

    const regDate = moment(
      alleDaten[data.name].reg_date,
      'YYYY-MM-DD HH:mm:ss'
    );

    // create first day by taking the current year
    let firstDayYear = `${moment().format('YYYY')}-12-18`;

    // if firstDayYear is in the future subtract 1 year
    if (moment().isBefore(moment(firstDayYear, 'YYYY-MM-DD'))) {
      firstDayYear = `${moment()
        .subtract(1, 'years')
        .format('YYYY')}-12-18`;
    }

    // first day of abrechnungs-month (?) - don't create it yet
    let firstDayMonth = '';

    // if today is after the 17th, currently in the next month
    if (today > 17) {
      firstDayMonth = `${moment().format('YYYY-MM')}-18`;
    }

    // if today is before the 18th, currently in the right month
    if (today < 18) {
      firstDayMonth = `${moment()
        .subtract(1, 'months')
        .format('YYYY-MM')}-18`;
    }

    // wenn tag kleiner ist als 18, der monat also im abrechnungszeitraumsmonat ist und der monat januar ist
    if (today < 18 && moment().format('MM') === '01') {
      firstDayMonth = firstDayYear;
    }

    // calc months currently worked
    const monthStart = moment(firstDayYear, 'YYYY-MM-DD');
    let months = 1;

    // loop through all billing months for this year until now
    while (monthStart.isBefore(moment())) {
      // this is always one month less, added that 1 month in the variable declaration for months
      if (!monthStart.isBefore(regDate) && !monthStart.isSame(regDate, 'day')) {
        months += 1;
      }

      monthStart.add(1, 'months');
    }

    const maxYear = statusMax * months;

    $.ajax({
      url: '../api/gehaltMax.php',
      method: 'POST',
      data: {
        ahid: data.ahid,
        firstDayMonth,
        firstDayYear,
      },
    })
      .done(maxData => {
        const res = JSON.parse(maxData);

        const month = Number(res.month) + Number(sendData.gehalt);
        const year = Number(res.year) + Number(sendData.gehalt);

        const mMax = statusMax - month;
        const yMax = maxYear - year;

        if (moments.end.isAfter(moments.start)) {
          document.getElementById('monthCell').innerHTML = `${roundTF(mMax)}€`;
          document.getElementById('yearCell').innerHTML = `${roundTF(yMax)}€`;
        } else {
          document.getElementById('monthCell').innerHTML = '';
          document.getElementById('yearCell').innerHTML = '';
        }

        if (yMax >= 0 && moments.end.isAfter(moments.start)) {
          confirmBtn.style.display = 'block';
        }
      })
      .fail(maxData => {
        return fehler(maxData.responseText);
      });
  };

  const gehaltStatus = Number(alleDaten[data.name].ahStatus);
  if (alleDaten[data.name].ahStatus !== 'Student') {
    if (Number.isNaN(gehaltStatus))
      return fehler('Fehler, bitte überprüfe den Status unter "Aushilfen"');
    calcMax(gehaltStatus);
  } else if (moments.end.isAfter(moments.start)) {
    confirmBtn.style.display = 'block';
  }

  // on end input change
  document.getElementById('end').onchange = e => {
    sendData.end = e.target.value;
    moments.end = moment(sendData.end, 'HH:mm');
    document.getElementById('endCell').innerHTML = sendData.end;

    if (moments.end.isAfter(moments.start)) {
      const newCalc = calcAZ(data.name, moments);

      pause = newCalc.pause;
      sendData.diff = newCalc.diff;
      sendData.gehalt = newCalc.gehalt;

      document.getElementById('azCell').innerHTML = zuStunden(newCalc.az);
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

      confirmBtn.style.display = 'none';
    }
  };

  // on amount input change
  document.getElementById('anzahl').onchange = e => {
    confirmBtn.style.display = 'none';

    const amount = e.target.value;
    sendData.gehalt = 40 * amount;

    calcMax(gehaltStatus);

    document.getElementById('amountCell').innerHTML = amount;
    document.getElementById('gehaltCell').innerHTML = `${sendData.gehalt}€`;
  };

  document.getElementById('confirm').onclick = () => {
    // ¯\_(ツ)_/¯
    if (pause === 1)
      sendData.end = moments.end.add(30, 'minutes').format('HH:mm');
    else if (pause === 2)
      sendData.end = moments.end.add(45, 'minutes').format('HH:mm');

    $.ajax({
      url: '../api/send.php',
      method: 'POST',
      data: sendData,
    })
      .done(sendResponse => {
        info(sendResponse);
        if (!notdienst) {
          $.ajax({
            url: '../api/signIn.php',
            method: 'POST',
            data: { deleteid: data.id },
          })
            .done(() => {
              event.target.remove();
              clearDOM('.preview');
              document.getElementById('endGroup').style.display = 'none';
              document.getElementById('delete').style.display = 'none';
              document.getElementById('confirm').style.display = 'none';
            })
            .fail(deletedata => {
              fehler(deletedata.responseText);
            });
        }
      })
      .fail(sendResponse => {
        fehler(sendResponse.responseText);
      });
  };

  return true;
};

const toggleSelect = (event, data) => {
  const signedIn = document.querySelectorAll('.signedIn');
  document.getElementById('confirm').style.display = 'none';
  document.getElementById('delete').style.display = 'none';

  // check each signed in ah if it is the current selected one
  // if it is, change the classList method and give it the selectedSI class
  signedIn.forEach(element => {
    element.classList[event.target === element ? 'toggle' : 'remove'](
      'selectedSI'
    );
  });

  // if there is a selected signedIn element remove the notdienst selection and create a preview
  if (event.target.classList.contains('selectedSI')) {
    document.getElementById('endGroup').style.display = 'block';
    unCheckND();
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
  // dataset id auf den namen den man auswählt?
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
    data: { signInData },
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

const prepareNdPreview = () => {
  const nameInputValue = document.getElementById('eintragenAuto').value;

  const notdienstData = {
    date: moment().format('YYYY-MM-DD'),
  };

  if (nameInputValue === '' || alleDaten[nameInputValue] === undefined)
    fehler('Aushilfe nicht gefunden');

  if (nameInputValue !== '') {
    notdienstData.name = nameInputValue;
    notdienstData.ahid = alleDaten[nameInputValue].id;
    createPreview(notdienstData);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // navbar current
  addCurrent('eintragen');

  // insert current time to inputs
  document.getElementById('start').value = moment().format('HH:mm');
  document.getElementById('end').value = moment().format('HH:mm');

  // all ah data
  getData(daten => {
    alleDaten = daten.alleDaten;
    createAutoComplete('#eintragenAuto', daten.stationNamen, daten.alleNamen);
  });

  // all signed in ah from db
  $.getJSON('../api/signIn.php').done(data => {
    listSignedIn(data);
  });

  // notdienst checkbox
  document.getElementById('ndCheck').addEventListener('click', e => {
    if (e.target.checked === true) {
      checkND();
    } else {
      unCheckND();
    }
  });

  // on anmelden submit
  document.getElementById('signInForm').addEventListener('submit', e => {
    if (!notdienst) {
      e.preventDefault();
      document.getElementById('fehlerAlert').style.display = 'none';
      document.getElementById('infoAlert').style.display = 'none';
      signIn();
    }
  });

  // on notdienst vorschau click
  document.getElementById('ndPreview').addEventListener('click', () => {
    prepareNdPreview();
  });
});
