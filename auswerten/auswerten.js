let html = '';
let stationNamen = [];
let ahDaten = [];

let tage = [];
let summe = [];
let eaBeginn = [];
let eaEnde = [];

$.get('../scripts/getdata.php', data => {
  const result = JSON.parse(data);
  stationNamen = result.stationNamen;
  ahDaten = result.ahDaten;
});

function eatabelle() {
  let eintragVorher;
  let gehaltEA;
  let sonderRow = ' ';
  // Ende Funktion wenn keine Einträge
  // if (tage.length === 0) {
  //   info('Keine Einträge für diesen Monat!');
  //   return;
  // }WICHTIG WIEDER REIN
  // Tage im Monat
  const monatSelect = moment($('#datum').val(), 'YYYY-MM').format('M');
  const monatfuerTage = monatSelect - 1;
  const monatsTage = moment(monatfuerTage, 'M').daysInMonth();
  let eintragsTag = 10; // todo kann weg?
  let eaMonatJahr = eaBeginn;

  const abrechnungsmonat = [];
  const sonderTabelle = [];

  // window[bla] ist ein key der eig garnicht im array ist. temporäre variable die gleichbleibt und dann push?
  for (let i = 10; i <= monatsTage; i += 1) {
    window[`tag${i}`] = {};
    window[`tag${i}`].datum = `${i}.${eaMonatJahr}`; // datum weg?
    window[`tag${i}`].tag = `<td>${i}.${eaMonatJahr}</td>`;
    window[`tag${i}`].beginn = '<td>&nbsp;</td>';
    window[`tag${i}`].ende = '<td>&nbsp;</td>';
    window[`tag${i}`].arbeitszeit = '<td>&nbsp;</td>';
    window[`tag${i}`].gehalt = '<td>&nbsp;</td>';
    window[`tag${i}`].eintrag = false;
    abrechnungsmonat.push(window[`tag${i}`]);
  }
  eaMonatJahr = eaEnde;
  for (let i = 1; i < 10; i += 1) {
    window[`tag${i}`] = {};
    window[`tag${i}`].datum = `0${i}.${eaMonatJahr}`; // datum weg?
    window[`tag${i}`].tag = `<td>0${i}.${eaMonatJahr}</td>`;
    window[`tag${i}`].beginn = '<td>&nbsp;</td>';
    window[`tag${i}`].ende = '<td>&nbsp;</td>';
    window[`tag${i}`].arbeitszeit = '<td>&nbsp;</td>';
    window[`tag${i}`].gehalt = '<td>&nbsp;</td>';
    window[`tag${i}`].eintrag = false;
    abrechnungsmonat.push(window[`tag${i}`]);
  }

  tage.forEach(tag => {
    let datenbankTag = moment(tag.datum, 'YYYY-MM-DD').format('DD.MM.YYYY');
    abrechnungsmonat.forEach(tabellenTag => {
      // eventuell unsafe -> funktionsparameter kriegt einen wert
      if (tabellenTag.datum === datenbankTag) {
        if (tabellenTag.eintrag === false) {
          tabellenTag.beginn = `<td>${tag.beginn}</td>`;
          tabellenTag.ende = `<td>${tag.ende}</td>`;
          // prettier-ignore
          tabellenTag.arbeitszeit = `<td>${moment.utc().startOf('day').add(tag.arbeitszeit, 'minutes').format('HH:mm')}</td>`;
          tabellenTag.gehalt = `<td>${roundTF(tag.gehalt)}</td>`;
          tabellenTag.eintrag = true;
        } else {
          // hier code für sondereintrag
        }
      }
    });
  });

  console.log(abrechnungsmonat);
  console.log(tage);

  // Funktion normaler Eintrag
  function tagZeile(row) {
    gehaltEA = tage[row].gehalt;
    if (tage[row].station != tage[row].ahstation)
      html += '<tr class="table-warning">';
    else html += '<tr>';
    html += `<td>${plusNull(eintragsTag)}.${eaMonatJahr}</td>`;
    html += `<td>${tage[row].beginn}</td>`;
    html += `<td>${tage[row].ende}</td>`;
    html += `<td>${moment
      .utc()
      .startOf('day')
      .add(tage[row].arbeitszeit, 'minutes')
      .format('HH:mm')}</td>`;
    html += `<td>${roundTF(gehaltEA)}</td></tr>`;
  }
  // Funktion Sondereintrag bei mehrfachem Datum
  function sonderZeile(row) {
    gehaltEA = tage[row].gehalt;
    if (tage[row].station != tage[row].ahstation)
      sonderRow += '<tr class="table-warning">';
    else sonderRow += '<tr>';
    sonderRow += `<td>${plusNull(eintragsTag)}.${eaMonatJahr}</td>`;
    sonderRow += `<td>${tage[row].beginn}</td>`;
    sonderRow += `<td>${tage[row].ende}</td>`;
    sonderRow += `<td>${moment
      .utc()
      .startOf('day')
      .add(tage[row].arbeitszeit, 'minutes')
      .format('HH:mm')}</td>`;
    sonderRow += `<td>${roundTF(gehaltEA)}</td></tr>`;
  }
  // Variable mit String für Tabelle
  // prettier-ignore
  html = `<h3 style="text-align:center">Arbeitszeitnachweis ${$('#nameInput').val()}<br>${moment(monatfuerTage, 'M').format('MMMM')}-${moment($('#datum').val(),'YYYY-MM').format('MMMM YYYY')}</h3>`;
  html +=
    '<table class="table table-bordered table-sm" style="width:100%"><caption>Gelb = In anderer Station gearbeitet</caption><thead><tr>';
  html += '<th style="width:20%">Tag</th>';
  html += '<th style="width:20%">Beginn</th>';
  html += '<th style="width:20%">Ende</th>';
  html += '<th style="width:20%">Arbeitszeit</th>';
  html += '<th style="width:20%">Gehalt</th></tr></thead><tbody>';

  abrechnungsmonat.forEach(tag => {
    html += `<tr>${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
  });

  /*

  // Loop für alle Abrechnungstage
  for (let i = 1; i <= monatsTage; i++) {
    let eintrag = false;
    // Loop für Objekt mit Tagen aus eaget.php
    tage.forEach(element => {
      momentTag = moment(element.datum, 'YYYY-MM-DD').format('D');
      // Normaler Eintrag
      if (eintragsTag == momentTag && eintragVorher != momentTag) {
        tagZeile(element);
        eintragVorher = momentTag;
        eintrag = true;
        // Sondereintrag
      } else if (momentTag == eintragVorher) {
        eintrag = true;
        eintragsTag--;
        sonderZeile(element);
      }
    });
    // Leerer Eintrag wenn davor nichts eingetragen wurde
    if (eintrag === false) {
      // prettier-ignore
      html += `<tr><td>${plusNull(eintragsTag)}.${eaMonatJahr}</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>`;
    }
    if (eintragsTag < monatsTage) {
      eintragsTag += 1;
    } else {
      eintragsTag = 1;
      eaMonatJahr = eaEnde;
    }
  }

  */

  // Wiedergeben der Tabelle
  $('#eaText').html(`${html}</tbody></table>`);
  // Tabelle für Sondereinträge
  let sonderEintrag = '<h3 style="text-align:center;">Sondereinträge</h3>';
  sonderEintrag +=
    '<table class="table table-bordered table-sm" style="width:100%;"><thead><tr>';
  sonderEintrag += '<th style="width:20%">Tag</th>';
  sonderEintrag += '<th style="width:20%">Beginn</th>';
  sonderEintrag += '<th style="width:20%">Ende</th>';
  sonderEintrag += '<th style="width:20%">Arbeitszeit</th>';
  sonderEintrag += '<th style="width:20%">Gehalt</th></tr></thead><tbody>';
  sonderEintrag += sonderRow;
  // Wenn die Tabelle Sondereinträge nicht leer ist -> diese wiedergeben
  if (sonderRow.length > 1)
    $('#eaText').append(`${sonderEintrag}</tbody></table>`);

  // Zusammenrechnung des Monats aus eaget.php
  $('#eaText').append(
    `<strong>Arbeitszeit:</strong> ${zuStunden(summe.arbeitszeit)}`
  );
  $('#eaText').append(`<br><strong>Arbeitstage:</strong> ${summe.datum}`);
  const sumGehalt = summe.gehalt;
  $('#eaText').append(`<br><strong>Gehalt:</strong> ${roundTF(sumGehalt)}€`);
  // wieviel bis maximales monatsgehalt / schon drüber
  const statusMax = parseInt(ahDaten[$('#nameInput').val()].ahStatus, 10);
  const bisMax = statusMax - sumGehalt;
  if (sumGehalt <= 450) {
    $('#eaText').append(
      `<br>Noch ${roundTF(bisMax)}€ bis ${roundTF(statusMax)}€<br>`
    );
  } else if (sumGehalt > 450) {
    $('#eaText').append(
      `<br><strong style="color:red;">Schon ${roundTF(-bisMax)}€ über ${roundTF(
        statusMax
      )}€</strong><br>`
    );
  }
  // Druckbutton
  $('#eaText').append(
    '<input type="button" onclick="drucken();" value="Drucken" class="noPrint btn scc my-3">'
  );
}

$(document).ready(() => {
  $('#eaform').submit(e => {
    e.preventDefault();
    $('#fehlerAlert').hide();
    $('#infoAlert').hide();

    const AHName = $('#nameInput').val();
    const { id } = ahDaten[AHName];

    const datum = $('#datum').val();

    $.ajax({
      url: 'eaget.php',
      type: 'POST',
      dataType: 'json',
      data: {
        id,
        datum
      }
    })
      .done(data => {
        const eaDaten = data;
        tage = eaDaten.tage;
        summe = eaDaten.summe;
        eaBeginn = eaDaten.beginn;
        eaEnde = eaDaten.ende;
        eatabelle();
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });
});

$(document).ajaxComplete(() => {
  $('#nameInput').autoComplete({
    minChars: 1,
    delay: 0,
    source(term, suggest) {
      term = term.toLowerCase();
      let matches = [];
      for (let i = 0; i < stationNamen.length; i++)
        if (~stationNamen[i].toLowerCase().indexOf(term))
          matches.push(stationNamen[i]);
      suggest(matches);
    }
  });
});
