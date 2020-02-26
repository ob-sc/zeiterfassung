import XLSX from 'xlsx';

import { session, fehler, roundTF, zuStunden } from './funktionen';
import stationen from './stationen';

const moment = require('moment');
const sortBy = require('lodash.sortby');

moment.locale('de');

session('lohnbuero');

const stationMap = stationen;

// Diese Stationen sollen nicht über Kehler abgerechnet werden
const indexEntfernen = [70, 89];

indexEntfernen.forEach(element => {
  stationMap.delete(element);
});

// Array mit allen gewünschten Stationnummern
const stationNummern = Array.from(stationMap.keys());

const abZeitraum = moment().format('MMMM YYYY');

const abrechnungFilename = `${moment().format('YYYY-MM')}-SC-aushilfen.xlsx`;
const abrechnungWB = XLSX.utils.book_new();

const weFilename = `${moment()
  .subtract(1, 'months')
  .format('YYYY-MM')}-SC-wochenende.xlsx`;
const weWB = XLSX.utils.book_new();

const notdienstFilename = `${moment().format('YYYY-MM')}-Umbuchungen.xlsx`;
const notdienstWB = XLSX.utils.book_new();

const wsAbrechnungCols = [
  { wpx: 40 },
  { wpx: 125 },
  { wpx: 125 },
  { wpx: 50 },
  { wpx: 50 },
  { wpx: 50 },
  { wpx: 50 },
  { wpx: 50 }
];

const wsWeCols = [{ wpx: 80 }, { wpx: 300 }, { wpx: 80 }, { wpx: 80 }];

const wsNotdienstCols = [
  { wpx: 40 },
  { wpx: 125 },
  { wpx: 125 },
  { wpx: 50 },
  { wpx: 50 },
  { wpx: 50 },
  { wpx: 50 },
  { wpx: 50 },
  { wpx: 50 }
];

const wsMargins = {
  left: 0.25,
  right: 0.25,
  top: 0.75,
  bottom: 0.75,
  header: 0.3,
  footer: 0.3
};

// ajax mit allen Stationen an API
$.ajax({
  url: '../api/lohnbuero.php',
  type: 'POST',
  dataType: 'json',
  data: { statID: stationNummern }
})
  .done(data => {
    const notdienstData = [];
    const fremdData = [];
    const controlling = [];

    notdienstData.push([
      'PN',
      'Nachname',
      'Vorname',
      'Menge',
      'Gehalt',
      'Station'
    ]);

    fremdData.push([null]);
    fremdData.push([
      'PN',
      'Nachname',
      'Vorname',
      'AZ',
      'Gehalt',
      'Tage',
      'Status',
      'Aus',
      'Für'
    ]);
    // Loop durch alle Stationsergebnisse
    Object.entries(data).forEach(([key, val]) => {
      /* Abrechnung */
      const wsAbrechnungData = [];
      // Abrechnung Worksheet name aus stationMap
      const stationMapObj = stationMap.get(parseInt(key, 10));
      const wsAbrechnungName = `${key} ${stationMapObj.name}`;

      // Abrechnung Obere Reihe
      wsAbrechnungData.push([
        'PN',
        'Nachname',
        'Vorname',
        'AZ',
        'Gehalt',
        'Tage',
        'Urlaub',
        'Status'
      ]);

      // Abrechnung Normal-Daten (sortiert)
      const normalData = sortBy(val.normal, [o => o.nachname]);

      // Abrechnung Zeilen erstellen
      Object.values(normalData).forEach(element => {
        const row = [];
        row.length = 0;
        const urlaubsberechnung =
          Math.floor((24 / 312) * element.urlaub * 2) / 2; // Urlaub, auf halbe / ganze abgerundet

        const urlaub = element.urlaub ? urlaubsberechnung : 0;

        row.push(element.personalnr);
        row.push(element.nachname);
        row.push(element.vorname);
        row.push(zuStunden(element.arbeitszeit));
        row.push(roundTF(element.gehalt));
        row.push(element.datum);
        row.push(urlaub);
        row.push(element.status);
        // todo bugfix für gelöschte aushilfen, iwann eleganter lösen!
        if (element.personalnr !== undefined) {
          wsAbrechnungData.push(row);
        }
      });

      // Abrechnung Notdienst
      Object.values(val.notdienst).forEach(element => {
        const notdienstRow = [];
        notdienstRow.length = 0;
        const notdienstGeld = element.gehalt;
        const menge = notdienstGeld / 40;

        if (notdienstGeld % 40 !== 0)
          fehler('Fehler bei der Notdienstberechnung');

        // wenn im objekt ein notdienst eingetragen ist
        // todo if clause element.urlaub === 'nd' weg?
        // todo  element.personalnr !== undefined ist ein bugfix, keine ahnung woher die undefined einträge kommen, laut db sollte php diese einträge nicht haben aber sie erscheinen halt
        // das sind einträge die nur eine station und ein gehalt haben, die es aber eigentlich nicht gibt
        // eventuell wie oben gelöschte aushilfen
        if (element.urlaub === 'nd' && element.personalnr !== undefined) {
          notdienstRow.push(element.personalnr);
          notdienstRow.push(element.nachname);
          notdienstRow.push(element.vorname);
          notdienstRow.push(menge);
          notdienstRow.push(roundTF(element.gehalt));
          notdienstRow.push(element.ahstation);
          notdienstData.push(notdienstRow);
        }
      });

      // Abrechnung fremde Zeiten
      Object.values(val.fremd).forEach(element => {
        const fremdRow = [];
        fremdRow.length = 0;

        fremdRow.push(element.personalnr);
        fremdRow.push(element.nachname);
        fremdRow.push(element.vorname);
        fremdRow.push(zuStunden(element.arbeitszeit));
        fremdRow.push(roundTF(element.gehalt));
        fremdRow.push(element.datum);
        fremdRow.push(element.status);
        fremdRow.push(element.ahstation); // station aus der die aushilfe kommt
        fremdRow.push(key); // station in der gearbeitet wurde

        fremdData.push(fremdRow);
      });

      const wsAbrechnung = XLSX.utils.aoa_to_sheet(wsAbrechnungData);
      XLSX.utils.book_append_sheet(
        abrechnungWB,
        wsAbrechnung,
        wsAbrechnungName
      );

      wsAbrechnung['!cols'] = wsAbrechnungCols;
      wsAbrechnung['!margins'] = wsMargins;

      /* WE LISTE */
      const wsWeData = [];
      // WE-Liste Worksheet name aus stationMap
      const wsWeName = `${key} ${stationMapObj.name}`;

      // WE-Liste Obere Reihe
      wsWeData.push(['Datum', 'Name', 'Stunden', 'Vergütung']);

      // WE-Liste Zeilen
      Object.values(val.we).forEach(element => {
        const weRow = [];
        weRow.length = 0;
        weRow.push(moment(element.datum, 'YYYY-MM-DD').format('DD.MM.YYYY'));
        weRow.push(element.name);
        weRow.push(element.stunden);
        weRow.push(element.ausgleich);
        wsWeData.push(weRow);
      });

      const wsWe = XLSX.utils.aoa_to_sheet(wsWeData);
      XLSX.utils.book_append_sheet(weWB, wsWe, wsWeName);

      wsWe['!cols'] = wsWeCols;
      wsWe['!margins'] = wsMargins;
    });

    notdienstData.forEach(element => {
      controlling.push(element);
    });
    fremdData.forEach(element => {
      controlling.push(element);
    });

    const wsNotdienst = XLSX.utils.aoa_to_sheet(controlling);
    XLSX.utils.book_append_sheet(notdienstWB, wsNotdienst, 'Umbuchungen');
    wsNotdienst['!cols'] = wsNotdienstCols;
    wsNotdienst['!margins'] = wsMargins;

    $('.XLSXwrapper').show();
  })
  .fail(data => {
    fehler(data.responseText);
  });

const downloadXLSX = (wb, filename) => {
  XLSX.writeFile(wb, filename);
};

$(document).ready(() => {
  $('#abrechnungXLSX').click(() => {
    downloadXLSX(abrechnungWB, abrechnungFilename);
  });

  $('#weListeXLSX').click(() => {
    downloadXLSX(weWB, weFilename);
  });

  $('#notdienstXLSX').click(() => {
    downloadXLSX(notdienstWB, notdienstFilename);
  });

  $('.pagetitle').html(abZeitraum);

  $('.abrechnungZeitraum').html(`${moment().format('MMMM')}`);

  $('#weZeitraum').html(
    `${moment()
      .subtract(1, 'months')
      .format('MMMM')}`
  );

  $('.lohnLogout').click(() => {
    window.location.href = '../scripts/logout.php';
  });
});
