let abDaten = [];
let titel;
let station;

$.get('../scripts/getdata.php', data => {
  const daten = JSON.parse(data);
  station = daten.station;
});

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

  /*
  for (const x in abDaten) {
    console.log(abDaten[x]);
    const urlaub = Math.floor((24 / 312) * abDaten[x].urlaub * 2) / 2; // Urlaub, auf halbe / ganze abgerundet
    const abgehalt = abDaten[x].gehalt;

    if (abDaten[x].ahstation != stationid && abDaten[x].arbeitszeit != 0)
      html += '<tr class="table-warning">';
    else html += '<tr>';
    html += `<td>${abDaten[x].personalnr}</td>`;
    html += `<td>${abDaten[x].nachname}, ${abDaten[x].vorname}</td>`;
    html += `<td>${zuStunden(abDaten[x].arbeitszeit)}</td>`;
    html += `<td>${roundTF(abgehalt)}</td>`;
    html += `<td>${abDaten[x].datum}</td>`;
    if (abDaten[x].ahstation != stationid && abDaten[x].arbeitszeit != 0)
      html += '<td>&nbsp</td>';
    else html += `<td>${urlaub}</td>`;
    html += `<td>${abDaten[x].status}</td>`;
    html += '<td contenteditable="true">&nbsp</td></tr>';

    summeAZ += parseInt(abDaten[x].arbeitszeit);
    summeGehalt += abDaten[x].gehalt;
  } todo muss weg*/

  abDaten.forEach(element => {
    const urlaub = Math.floor((24 / 312) * element.urlaub * 2) / 2; // Urlaub, auf halbe / ganze abgerundet
    const abgehalt = element.gehalt;

    if (element.ahstation != stationid && element.arbeitszeit != 0)
      html += '<tr class="table-warning">';
    else html += '<tr>';
    html += `<td>${element.personalnr}</td>`;
    html += `<td>${element.nachname}, ${element.vorname}</td>`;
    html += `<td>${zuStunden(element.arbeitszeit)}</td>`;
    html += `<td>${roundTF(abgehalt)}</td>`;
    html += `<td>${element.datum}</td>`;
    if (element.ahstation != stationid && element.arbeitszeit != 0)
      html += '<td>&nbsp</td>';
    else html += `<td>${urlaub}</td>`;
    html += `<td>${element.status}</td>`;
    html += '<td contenteditable="true">&nbsp</td></tr>';

    summeAZ += parseInt(element.arbeitszeit, 10);
    summeGehalt += element.gehalt;
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
