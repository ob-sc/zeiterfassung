import XLSX from 'xlsx';

import { session, fehler } from './funktionen';
import stationen from './stationen';

const moment = require('moment');
const sortBy = require('lodash.sortby');

session('kehler', data => {
  // nur kehler darf auf die seite
});

const stationMap = stationen;

// Diese Stationen sollen nicht über Kehler abgerechnet werden
const indexEntfernen = [70, 89];

indexEntfernen.forEach(element => {
  stationMap.delete(element);
});

console.log(stationMap);
console.warn(stationMap.get(11));

// Array mit allen gewünschten Stationnummern
const stationNummern = Array.from(stationMap.keys());

const abZeitraum = moment().format('MMMM YYYY');

const filename = `${moment().format('YYYY-MM')}-SC-aushilfen.xlsx`;
const wb = XLSX.utils.book_new();

// ajax mit allen Stationen an API
$.ajax({
  url: '../api/kehler.php',
  type: 'POST',
  dataType: 'json',
  data: { statID: stationNummern }
})
  .done(data => {
    console.log(data);
    let wsName = '';

    Object.entries(data).forEach(([key, val]) => {
      const stationMapObj = stationMap.get(key);
      console.log(stationMapObj);
      console.error(key);
      wsName = `${key} ${stationMapObj.name}`;
      console.log(wsName);
      console.log(key); // the name of the current key.
      console.log(val); // the value of the current key.
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, wsName);
  })
  .fail(data => {
    fehler(data.responseText);
  });

window.downloadXLSX = () => {
  XLSX.writeFile(wb, filename);
};
