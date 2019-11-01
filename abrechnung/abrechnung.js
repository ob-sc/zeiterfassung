/* global moment, zuStunden, roundTF, sortByNachname, fehler */

let abDaten = [];
let titel;
let station;
let stationid;

$.get('../scripts/getdata.php', data => {
  const daten = JSON.parse(data);
  station = daten.station;
  stationid = daten.stationid;
});

// ABRECHNUNG PDF speichern
function printpdf() {
  const doc = new jsPDF();
  doc.autoTable({
    html: '#abrechnungTable',
    useCss: true,
    didDrawPage: () => {
      doc.text(titel, 14, 10);
    }
  });
  doc.save(`${titel}.pdf`);
}

function abtabelle() {
  let summeAZ = 0;
  let summeGehalt = 0;

  // prettier-ignore
  titel = `${station}, ${moment($('#datum').val(), 'YYYY-MM').format('MMMM YYYY')}`;

  let html = `<h3 style="text-align:center">Monatsabrechnung ${titel}</h3>`;
  html +=
    '<table class="table table-bordered table-sm table-hover" style="width:100%" id="abrechnungTable">';
  html += '<caption>Gelb = Aushilfe aus anderer Station</caption><thead><tr>';
  html += '<th style="width:5%">PN</th>';
  html += '<th style="width:40%">Name</th>';
  html += '<th style="width:5%">AZ</th>';
  html += '<th style="width:5%">Gehalt</th>';
  html += '<th style="width:5%">Tage</th>';
  html += '<th style="width:5%">Urlaub</th>';
  html += '<th style="width:5%">Status</th>';
  html += '<th style="width:30%">Abmelden ab dem</th>';
  html += '</tr></thead><tbody>';

  abDaten.forEach(key => {
    const urlaub = Math.floor((24 / 312) * key.urlaub * 2) / 2; // Urlaub, auf halbe / ganze abgerundet
    const abgehalt = key.gehalt;

    if (key.ahstation != stationid && key.arbeitszeit !== 0)
      html += '<tr class="table-warning">';
    else html += '<tr>';
    html += `<td>${key.personalnr}</td>`;
    html += `<td>${key.nachname}, ${key.vorname}</td>`;
    html += `<td>${zuStunden(key.arbeitszeit)}</td>`;
    html += `<td>${roundTF(abgehalt)}</td>`;
    html += `<td>${key.datum}</td>`;
    if (key.ahstation != stationid && key.arbeitszeit !== 0)
      html += '<td>&nbsp</td>';
    else html += `<td>${urlaub}</td>`;
    html += `<td>${key.status}</td>`;
    html += '<td contenteditable="true">&nbsp</td></tr>';

    summeAZ += parseInt(key.arbeitszeit, 10);
    summeGehalt += key.gehalt;
  });

  const pdfbtn =
    '<input type="button" onclick="printpdf();" value="Speichern" class="noPrint btn scc">';

  // prettier-ignore
  html += `<tr><td>&nbsp</td><td>&nbsp</td><th>${zuStunden(summeAZ)}</th><th>${roundTF(summeGehalt)}</th><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td></tr></tbody></table>`;

  $('#atext').html(html + pdfbtn);
}

$(document).ready(() => {
  // für jeden input Datum - automatisch Datum heute
  const datumInput = document.getElementById('datum');
  datumInput.valueAsDate = new Date();

  $('#aform').submit(e => {
    e.preventDefault();
    $('#fehlerAlert').hide();
    $('#infoAlert').hide();
    $.ajax({
      url: 'abget.php',
      type: 'POST',
      dataType: 'json',
      data: $('#aform').serialize()
    })
      .done(data => {
        const dieseStation = data.daten;
        abDaten = dieseStation.sort(sortByNachname);
        abtabelle();
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });
});
