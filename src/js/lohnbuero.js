import XLSX from 'xlsx';

import { session, fehler, roundTF, zuStunden } from './funktionen';
import stationen from './stationen';

const moment = require('moment');
const sortBy = require('lodash.sortby');

moment.locale('de');

session('', data => {
  // nur kehler darf auf die seite
});

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

// ajax mit allen Stationen an API
$.ajax({
  url: '../api/kehler.php',
  type: 'POST',
  dataType: 'json',
  data: { statID: stationNummern }
})
  .done(data => {
    // Loop durch alle Stationsergebnisse
    Object.entries(data).forEach(([key, val]) => {
      const wsData = [];
      // Worksheet name aus stationMap
      const stationMapObj = stationMap.get(parseInt(key, 10));
      const wsName = `${key} ${stationMapObj.name}`;

      // Obere Reihe
      wsData.push([
        'PN',
        'Nachname',
        'Vorname',
        'AZ',
        'Gehalt',
        'Tage',
        'Urlaub',
        'Status'
      ]);

      // Normal-Daten (sortiert)
      const normalData = sortBy(val.normal, [o => o.nachname]);

      // Zeilen erstellen
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
        if (element.ahstation !== parseInt(key, 10))
          row.push(`aus ${element.ahstation}`);
        else row.push(element.status);
        wsData.push(row);
      });

      // Notdienst
      const notdienstData = [];
      notdienstData.length = 0;

      notdienstData.push([null], ['Notdienst']);
      notdienstData.push(['PN', 'Nachname', 'Vorname', 'Menge', 'Gehalt']);

      Object.values(val.notdienst).forEach(element => {
        const notdienstRow = [];
        notdienstRow.length = 0;
        const notdienstGeld = element.gehalt;
        const menge = notdienstGeld / 40;

        if (notdienstGeld % 40 !== 0)
          fehler('Fehler bei der Notdienstberechnung');

        // wenn im objekt ein notdienst eingetragen ist
        if (element.urlaub === 'nd') {
          notdienstRow.push(element.personalnr);
          notdienstRow.push(element.nachname);
          notdienstRow.push(element.vorname);
          notdienstRow.push(menge);
          notdienstRow.push(roundTF(element.gehalt));
          notdienstData.push(notdienstRow);
        }
      });

      // Notdienst Daten in Worksheet Daten pushen, Zeile für Zeile (wenn nicht nur überschrift sondern daten vorhanden)
      if (notdienstData.length > 4) {
        notdienstData.forEach(element => {
          wsData.push(element);
        });
      }

      // Zellen formatieren:
      // https://github.com/SheetJS/sheetjs#common-spreadsheet-format

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(abrechnungWB, ws, wsName);

      ws['!cols'] = [
        { wpx: 40 },
        { wpx: 125 },
        { wpx: 125 },
        { wpx: 50 },
        { wpx: 50 },
        { wpx: 50 },
        { wpx: 50 },
        { wpx: 50 }
      ];

      ws['!margins'] = {
        left: 0.25,
        right: 0.25,
        top: 0.75,
        bottom: 0.75,
        header: 0.3,
        footer: 0.3
      };
    });
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
  $('.pagetitle').html(abZeitraum);
});
