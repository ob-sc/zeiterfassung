const autoComplete = require('@tarekraafat/autocomplete.js/dist/js/autoComplete');

// tfw keine API
export const getData = callback => {
  $.getJSON('../scripts/getdata.php').done(data => {
    callback(data);
  });
};

/* zum benutzen:
getData(daten => {
  console.log(daten);
});
*/

// Fehler Alert
export function fehler(tx) {
  $('#fehlerText').html(tx);
  $('#fehlerAlert').fadeIn('fast');
  $('#fehlerClose').click(() => {
    $('#fehlerAlert').fadeOut('fast');
  });
}

// Info Alert
export function info(tx) {
  $('#infoText').html(tx);
  $('#infoAlert').fadeIn('fast');
  $('#infoClose').click(() => {
    $('#infoAlert').fadeOut('fast');
  });
}

// function createStationSelect(data, status) {

// }

// session
export const session = status => {
  $.ajax({
    url: '../scripts/session.php',
    method: 'POST',
    data: 'setTime',
    dataType: 'json'
  })
    .done(data => {
      if (data.status === 'invalid')
        window.location.href = '../index.html#expire';

      if (data.userStatus === 'neu') window.location.href = '../index.html#neu';

      if (status === 'sl')
        if (data.userStatus !== 'admin' && data.userStatus !== 'sl')
          window.location.href = '../index.html#verlaufen';

      $(document).ready(() => {
        // nicht mehr #adminmenu
        if (data.userStatus === 'admin') $('#adminmenu, .slmenu').show();
        if (data.userStatus === 'sl') $('.slmenu').show();

        $('#stationSelect').val(data.stationID);
      });
    })
    .fail(() => {
      fehler('Fehler bei der Authentifizierung! Du wirst abgemeldet.');
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 5000);
    });

  // jede minute (60000) check ob session abgelaufen
  setInterval(() => {
    $.getJSON('../scripts/session.php').done(data => {
      console.warn(`Session ${data.status}, ${data.timestamp} sekunden`);

      if (data.timestamp >= 480)
        info(
          'Du wirst in 2 Minuten wegen Inaktivität abgemeldet. Bitte lade die Seite neu.'
        );

      if (data.status === 'invalid')
        window.location.href = '../index.html#expire';
    });
  }, 60000);
};

// Autocomplete, srcArray1 = normal, 2 = alle
// eventuell läd er den spaß hier bevor der dom geladen ist -> findet die id nicht
export function createAutoComplete(id, srcArray1, srcArray2) {
  // eslint-disable-next-line
  const autoCompleteInput = new autoComplete({
    data: {
      src: srcArray1,
      cache: true
    },
    sort: (a, b) => {
      if (a.match < b.match) return -1;
      if (a.match > b.match) return 1;
      return 0;
    },
    selector: id,
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
      document.querySelector(id).blur();
      const selection = feedback.selection.value;
      document.querySelector(id).value = selection;
    }
  });

  const resultsList = document.querySelector('#autoComplete_list');

  ['focus', 'blur'].forEach(eventType => {
    document.querySelector(id).addEventListener(eventType, () => {
      if (eventType === 'blur') {
        resultsList.style.display = 'none';
      } else if (eventType === 'focus') {
        resultsList.style.display = 'block';
      }
    });
  });

  const stationCheck = document.getElementById('stationCheck');
  if (stationCheck) {
    // eslint-disable-next-line func-names
    $('#stationCheck').change(function() {
      $(id).val('');
      resultsList.innerHTML = '';
      if (this.checked) {
        autoCompleteInput.data = {
          src: srcArray2,
          cache: true
        };
        autoCompleteInput.dataStream = srcArray2;
      } else {
        autoCompleteInput.data = {
          src: srcArray1,
          cache: true
        };
        autoCompleteInput.dataStream = srcArray1;
      }
    });
  }
}

// moment.js duration kann man nicht auf HH:mm formatieren. Daher string aus arbeitszeit minuten:
export function zuStunden(azMinuten) {
  let stunden = Math.floor(azMinuten / 60);
  let minuten = azMinuten % 60;
  if (stunden < 10) stunden = `0${stunden}`;
  if (minuten < 10) minuten = `0${minuten}`;
  const azString = `${stunden}:${minuten}`;
  return azString;
}

// RUNDEN to fixed 2 / return als string
export function roundTF(v) {
  // value als string
  const value = String(v);

  // wenn kein . dann return mit 2 nullen
  if (!value.includes('.')) return `${value}.00`;

  // trennen bei "."
  const values = value.split('.');
  const decimal = values[0];
  const decimalPlaceTotal = values[1];
  const twoPlaces = decimalPlaceTotal.substr(0, 2);

  // Prüfen auf kleiner drei Nachkommastellen
  if (decimalPlaceTotal.length < 3) {
    return String(`${decimal}.${twoPlaces.padEnd(2, '0')}`);
  }

  // dritte Nachkommastelle zur Prüfung auf- oder abrunden
  const decider = parseInt(decimalPlaceTotal[2], 10);

  // prüfen, ob auf- oder abrunden
  if (decider < 5) {
    return String(`${decimal}.${twoPlaces}`);
  }

  // Prüfen ob Dezimalsprung
  if (twoPlaces === '99') {
    let decimalRoundedUp = parseInt(decimal, 10);
    decimalRoundedUp += 1;
    return String(`${decimalRoundedUp}.00`);
  }

  // prüfen ob erste Stelle nicht Null
  if (decimalPlaceTotal[0] !== '0') {
    // "einfach" aufrunden
    let roundedUp = parseInt(twoPlaces, 10);
    roundedUp += 1;
    return String(`${decimal}.${roundedUp}`);
  }

  // letzte Stelle zur Prüfung aufrunden
  let lastPlace = parseInt(decimalPlaceTotal[1], 10);
  lastPlace += 1;
  // prüfen ob Zehnersprung nach Aufrunden, dann zweistellig zurückgeben
  if (lastPlace > 9) {
    return String(`${decimal}.${lastPlace}`);
  }

  // wenn kein Zehnersprung, dann "0" und einstellig zurückgeben
  return String(`${decimal}.0${lastPlace}`);
}
