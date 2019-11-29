import * as JsPDF from 'jspdf';
import 'jspdf-autotable';
import { session, getData, zuStunden, roundTF, fehler } from './funktionen';

const moment = require('moment');
const sortBy = require('lodash.sortby');

moment.locale('de');

let abDaten = [];
let ndDaten = [];

let html = '';
let ndhtml = '';

let titel;

let station;
let stationid;

session();

getData(daten => {
  station = daten.station;
  stationid = daten.stationid;
});

// ABRECHNUNG PDF speichern
window.printpdf = () => {
  const doc = new JsPDF();
  doc.autoTable({
    html: '#abrechnungTable',
    useCss: true,
    didDrawPage: () => {
      doc.text(titel, 14, 10);
    }
  });
  doc.save(`${titel}.pdf`);
};

function abtabelle() {
  let summeAZ = 0;
  let summeGehalt = 0;

  // prettier-ignore
  titel = `${station}, ${moment($('#datum').val(), 'YYYY-MM').format('MMMM YYYY')}`;

  html = `<h3 style="text-align:center">Monatsabrechnung ${titel}</h3>`;
  html +=
    '<table class="table table-bordered table-sm table-hover" style="width:100%" id="abrechnungTable">';
  html +=
    '<caption>Gelb = Aushilfe aus anderer Station</caption><thead style="font-size:0.8em"><tr>';
  html += '<th style="width:5%">PN</th>';
  html += '<th class="table-ltr" style="width:40%">Name</th>';
  html += '<th style="width:5%">AZ</th>';
  html += '<th style="width:5%">Gehalt</th>';
  html += '<th style="width:5%">Tage</th>';
  html += '<th style="width:5%">Urlaub</th>';
  html += '<th style="width:5%">Status</th>';
  html += '<th style="width:30%">Abmelden ab dem</th>';
  html += '</tr></thead><tbody>';

  abDaten.forEach(key => {
    const urlaub = Math.floor((24 / 312) * key.urlaub * 2) / 2; // Urlaub, auf halbe / ganze abgerundet
    const abGehalt = key.gehalt;

    // eslint-disable-next-line eqeqeq
    if (key.ahstation != stationid && key.arbeitszeit !== 0)
      html += '<tr class="table-warning">';
    else html += '<tr>';
    html += `<td>${key.personalnr}</td>`;
    html += `<td class="table-ltr">${key.nachname}, ${key.vorname}</td>`;
    html += `<td class="table-rtl">${zuStunden(key.arbeitszeit)}</td>`;
    html += `<td class="table-rtl">${roundTF(abGehalt)}</td>`;
    html += `<td class="table-rtl">${key.datum}</td>`;
    // eslint-disable-next-line eqeqeq
    if (key.ahstation != stationid && key.arbeitszeit !== 0)
      html += '<td>&nbsp</td>';
    else html += `<td class="table-rtl">${urlaub}</td>`;
    html += `<td class="table-rtl">${key.status}</td>`;
    html += '<td contenteditable="true">&nbsp</td></tr>';

    summeAZ += parseInt(key.arbeitszeit, 10);
    summeGehalt += key.gehalt;
  });

  // prettier-ignore
  html += `<tr><td>&nbsp</td><td>&nbsp</td><th>${zuStunden(summeAZ)}</th><th>${roundTF(summeGehalt)}</th><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td></tr></tbody></table>`;

  // Notdienst
  ndhtml = `<div id="ndTableContainer" style="display:none"><h3 style="text-align:center">Notdienst</h3>`;
  ndhtml +=
    '<table class="table table-bordered table-sm table-hover" style="width:100%" id="notdienstTable"><thead style="font-size:0.8em"><tr>'; // ; margin-left:auto; margin-right:auto
  ndhtml += '<th style="width:5%">PN</th>';
  ndhtml += '<th class="table-ltr" style="width:40%">Name</th>';
  ndhtml += '<th style="width:5%">Anz.</th>';
  ndhtml += '<th style="width:5%">Gehalt</th>';
  ndhtml += '<th style="width:45%">Abmelden ab dem</th>';
  ndhtml += '</tr></thead><tbody></div>';

  let notdienst = false;

  ndDaten.forEach(key => {
    const ndabGehalt = key.gehalt;
    const menge = ndabGehalt / 40;

    if (ndabGehalt % 40 !== 0) fehler('Fehler bei der Notdienstberechnung');

    if (key.urlaub === 'nd') {
      ndhtml += `<tr><td>${key.personalnr}</td>`;
      ndhtml += `<td class="table-ltr">${key.nachname}, ${key.vorname}</td>`;
      ndhtml += `<td class="table-rtl">${menge}</td>`;
      ndhtml += `<td class="table-rtl">${roundTF(ndabGehalt)}</td>`;
      ndhtml += '<td>&nbsp</td></tr>';

      notdienst = true;
    }
  });

  ndhtml += '</tbody></table>';

  const pdfbtn =
    '<input type="button" onclick="printpdf();" value="Speichern" class="noPrint btn scc">';

  $('#atext').html(html + ndhtml + pdfbtn);

  if (notdienst) $('#ndTableContainer').show();
  else ndhtml = '';
}

$(document).ready(() => {
  $('nav li').removeClass('current');
  $('#abrechnung').addClass('current');

  $('#aform').submit(e => {
    e.preventDefault();
    $('#fehlerAlert').hide();
    $('#infoAlert').hide();

    $.ajax({
      url: '../api/abget.php',
      type: 'POST',
      dataType: 'json',
      data: $('#aform').serialize()
    })
      .done(abdata => {
        const dieseStation = abdata.daten;

        abDaten = sortBy(dieseStation, [o => o.nachname]);
        ndDaten = abdata.ndDaten;

        abtabelle();
      })
      .fail(abdata => {
        fehler(abdata.responseText);
      });
  });
});
