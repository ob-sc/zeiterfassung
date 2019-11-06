/* global moment */
const moment = require('moment');
import { moment } from 'moment';

moment.locale('de');

let userStatus;

// sortieren
const firstBy = (function() {
  function n(n) {
    return n;
  }
  function t(n) {
    return 'string' === typeof n ? n.toLowerCase() : n;
  }
  function r(r, e) {
    if (
      ((e = 'number' === typeof e ? { direction: e } : e || {}),
      'function' !== typeof r)
    ) {
      let u = r;
      r = function(n) {
        return n[u] ? n[u] : '';
      };
    }
    if (1 === r.length) {
      let i = r;
      let o = e.ignoreCase ? t : n;
      r = function(n, t) {
        return o(i(n)) < o(i(t)) ? -1 : o(i(n)) > o(i(t)) ? 1 : 0;
      };
    }
    return -1 === e.direction
      ? function(n, t) {
          return -r(n, t);
        }
      : r;
  }
  function e(n, t) {
    return (n = r(n, t)), (n.thenBy = u), n;
  }
  function u(n, t) {
    let u = this;
    return (
      (n = r(n, t)),
      e(function(t, r) {
        return u(t, r) || n(t, r);
      })
    );
  }
  return e;
})();
// prepare sort by nachname
const sortByNachname = firstBy('nachname');

// Fehler Alert
function fehler(tx) {
  $('#fehlerText').html(tx);
  $('#fehlerAlert').fadeIn('fast');
  $('#fehlerClose').click(() => {
    $('#fehlerAlert').fadeOut('fast');
  });
}

// Info Alert
function info(tx) {
  $('#infoText').html(tx);
  $('#infoAlert').fadeIn('fast');
  $('#infoClose').click(() => {
    $('#infoAlert').fadeOut('fast');
  });
}

// CONFIG
$.get('../scripts/getconfig.php', data => {
  const config = JSON.parse(data);
  const { settings } = config.daten;
  if (settings.devmode === '1') console.log('dev');
});

/* in einzelnen seiten

// namen, löhne und station für alle
$.get('../scripts/getdata.php', data => {
  const result = JSON.parse(data);
  stationNamen = result.stationNamen;
  alleNamen = result.alleNamen;
  ahDaten = result.ahDaten;
  alleDaten = result.alleDaten;
  maDaten = result.maDaten;
  stationid = result.stationid;
  station = result.station;
  userStatus = result.status;
});

*/
$.get('../scripts/getdata.php', data => {
  const result = JSON.parse(data);
  userStatus = result.status;
});

// moment.js duration kann man nicht auf HH:mm formatieren. Daher string aus arbeitszeit minuten:
function zuStunden(azMinuten) {
  let stunden = Math.floor(azMinuten / 60);
  let minuten = azMinuten % 60;
  if (stunden < 10) stunden = `0${stunden}`;
  if (minuten < 10) minuten = `0${minuten}`;
  const azString = `${stunden}:${minuten}`;
  return azString;
}

// DRUCKEN
function drucken() {
  $('.tabelle-rechts').css('width', '100%');
  window.print();
}

// RUNDEN to fixed 2 / return als string
const roundTF = v => {
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
};

$(document).ready(() => {
  // NACH DRUCKEN
  window.onafterprint = () => {
    $('.tabelle-rechts').css('width', '70%');
  };
});

$(document).ajaxComplete(() => {
  // ADMIN / SL für Menü
  if (userStatus === 'admin') $('#adminmenu, .slmenu').show();
  if (userStatus === 'sl') $('.slmenu').show();
});
