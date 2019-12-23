import * as JsPDF from 'jspdf';
import 'jspdf-autotable';
import { session, zuStunden, roundTF, fehler } from './funktionen';
import stationen from './stationen';

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

let notdienst = false;

session('sl', data => {
  stationid = parseInt(data.stationID, 10);
  const stationObj = stationen.get(stationid);
  station = stationObj.name;
});

// ABRECHNUNG PDF speichern
window.printpdf = () => {
  $('#abrechnungTable')
    .find('td.abmelden')
    // eslint-disable-next-line func-names
    .each(function() {
      $(this).html('');
    });

  const doc = new JsPDF();
  doc.autoTable({
    html: '#abrechnungTable',
    theme: 'plain',
    styles: { lineWidth: 0.1 },
    didDrawPage: () => {
      doc.text(titel, 14, 10);
    }
  });
  if (notdienst) {
    doc.autoTable({
      html: '#notdienstTable',
      theme: 'plain',
      styles: { lineWidth: 0.1 }
    });
  }
  doc.save(`${titel}.pdf`);

  $('#abrechnungTable')
    .find('td.abmelden')
    // eslint-disable-next-line func-names
    .each(function() {
      $(this).html('Abmelden');
    });
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
  html += '<th style="width:30%">Sonstiges</th>';
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
    // eslint-disable-next-line eqeqeq
    if (key.ahstation != stationid && key.arbeitszeit !== 0)
      html += `<td>Aus Station ${key.ahstation}</td></tr>`;
    else
      html += `<td contenteditable="false" class="abmelden">Abmelden</td></tr>`;

    summeAZ += parseInt(key.arbeitszeit, 10);
    summeGehalt += key.gehalt;
  });

  // prettier-ignore
  html += `<tr><td>&nbsp</td><td>&nbsp</td><th>${zuStunden(summeAZ)}</th><th>${roundTF(summeGehalt)}</th><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td></tr></tbody></table>`;

  // Notdienst
  ndhtml = `<div id="ndTableContainer" style="display:none"><h3 style="text-align:center">Notdienst</h3>`;
  ndhtml +=
    '<table class="table table-bordered table-sm table-hover" style="width:100%" id="notdienstTable"><thead style="font-size:0.8em"><tr>';
  ndhtml += '<th style="width:5%">PN</th>';
  ndhtml += '<th class="table-ltr" style="width:40%">Name</th>';
  ndhtml += '<th style="width:5%">Anz.</th>';
  ndhtml += '<th style="width:5%">Gehalt</th>';
  ndhtml += '<th style="width:45%">Sonstiges</th>';
  ndhtml += '</tr></thead><tbody>';

  ndDaten.forEach(key => {
    const ndabGehalt = key.gehalt;
    const menge = ndabGehalt / 40;

    if (ndabGehalt % 40 !== 0) fehler('Fehler bei der Notdienstberechnung');

    if (key.urlaub === 'nd') {
      ndhtml += `<tr><td>${key.personalnr}</td>`;
      ndhtml += `<td class="table-ltr">${key.nachname}, ${key.vorname}</td>`;
      ndhtml += `<td class="table-rtl">${menge}</td>`;
      ndhtml += `<td class="table-rtl">${roundTF(ndabGehalt)}</td>`;
      ndhtml += '<td contenteditable="true">&nbsp</td></tr>';

      notdienst = true;
    }
  });

  ndhtml += '</tbody></table></div>';

  const pdfbtn =
    '<input type="button" onclick="printpdf();" value="Speichern" class="noPrint btn scc">';

  $('#atext').html(html + ndhtml + pdfbtn);

  if (notdienst) $('#ndTableContainer').show();
  // else ndhtml = '';

  const heute = moment().format('DD.MM.YYYY');

  $('.abmelden').click(e => {
    if (e.currentTarget.contentEditable === 'false') {
      e.currentTarget.contentEditable = 'true';
      e.currentTarget.innerHTML = `Abmelden ab ${heute}`;
      e.currentTarget.classList.remove('abmelden');
    }
  });
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
