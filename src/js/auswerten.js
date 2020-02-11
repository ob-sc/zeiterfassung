import {
  session,
  getData,
  createAutoComplete,
  roundTF,
  zuStunden,
  fehler,
  info,
  durchschnittBerechnung
} from './funktionen';

const moment = require('moment');

moment.locale('de');

let html = '';
let sonderRow = '';

let ahDaten;

session('norm');

// DRUCKEN
window.drucken = () => {
  $('.tabelle-rechts').css('width', '100%');
  window.print();
};

function eatabelle(eaDaten) {
  sonderRow = '';

  // Ende Funktion wenn keine Einträge
  if (eaDaten.tage.length === 0) {
    info('Keine Einträge für diesen Monat!');
    return;
  }

  // Tage im Monat
  const monatSelect = moment($('#datum').val(), 'YYYY-MM').format('M');
  const monatfuerTage = moment(monatSelect, 'M').subtract(1, 'months');
  const monatsTage = monatfuerTage.daysInMonth();
  let eaMonatJahr = eaDaten.beginn;

  const abrechnungsmonat = [];
  const sonderTabelle = [];

  // Abrechnungszeitrum 1
  for (let i = 17; i <= monatsTage; i += 1) {
    const tempObjekt = {};
    tempObjekt.datum = `${i}.${eaMonatJahr}`;
    tempObjekt.tag = `<td>${i}.${eaMonatJahr}</td>`;
    tempObjekt.beginn = '<td>&nbsp;</td>';
    tempObjekt.ende = '<td>&nbsp;</td>';
    tempObjekt.arbeitszeit = '<td>&nbsp;</td>';
    tempObjekt.gehalt = '<td>&nbsp;</td>';
    tempObjekt.eintrag = false;
    tempObjekt.station = false; // bei anderer station
    tempObjekt.notdienst = false; // bei notdienst
    abrechnungsmonat.push(tempObjekt);
  }

  // Abrechnungszeitrum 2
  eaMonatJahr = eaDaten.ende;
  for (let i = 1; i < 17; i += 1) {
    const tempObjekt = {};
    if (i < 10) {
      tempObjekt.datum = `0${i}.${eaMonatJahr}`;
      tempObjekt.tag = `<td>0${i}.${eaMonatJahr}</td>`;
    } else {
      tempObjekt.datum = `${i}.${eaMonatJahr}`;
      tempObjekt.tag = `<td>${i}.${eaMonatJahr}</td>`;
    }
    tempObjekt.beginn = '<td>&nbsp;</td>';
    tempObjekt.ende = '<td>&nbsp;</td>';
    tempObjekt.arbeitszeit = '<td>&nbsp;</td>';
    tempObjekt.gehalt = '<td>&nbsp;</td>';
    tempObjekt.eintrag = false;
    tempObjekt.station = false; // bei anderer station
    tempObjekt.notdienst = false; // bei notdienst
    abrechnungsmonat.push(tempObjekt);
  }

  eaDaten.tage.forEach(tag => {
    const datenbankTag = moment(tag.datum, 'YYYY-MM-DD').format('DD.MM.YYYY');
    abrechnungsmonat.forEach(tabellenTag => {
      if (tabellenTag.datum === datenbankTag) {
        if (tabellenTag.eintrag === false) {
          const tagObjekt = tabellenTag;
          if (tag.station !== tag.ahstation) tagObjekt.station = true;
          if (tag.beginn === 'nd') tagObjekt.notdienst = true;
          else {
            tagObjekt.beginn = `<td>${tag.beginn}</td>`;
            tagObjekt.ende = `<td>${tag.ende}</td>`;
            // prettier-ignore
            tagObjekt.arbeitszeit = `<td>${moment.utc().startOf('day').add(tag.arbeitszeit, 'minutes').format('HH:mm')}</td>`;
          }

          tagObjekt.gehalt = `<td>${roundTF(tag.gehalt)}</td>`;
          tagObjekt.eintrag = true;
        } else {
          const sonderObjekt = {};
          if (tag.station !== tag.ahstation) sonderObjekt.station = true;
          if (tag.beginn === 'nd') sonderObjekt.notdienst = true;
          else sonderObjekt.station = false;
          sonderObjekt.tag = `<td>${datenbankTag}</td>`;
          sonderObjekt.beginn = `<td>${tag.beginn}</td>`;
          sonderObjekt.ende = `<td>${tag.ende}</td>`;
          // prettier-ignore
          sonderObjekt.arbeitszeit = `<td>${moment.utc().startOf('day').add(tag.arbeitszeit, 'minutes').format('HH:mm')}</td>`;
          sonderObjekt.gehalt = `<td>${roundTF(tag.gehalt)}</td>`;
          sonderTabelle.push(sonderObjekt);
        }
      }
    });
  });

  // Variable mit String für Tabelle
  // prettier-ignore
  html = `<h3 style="text-align:center">Arbeitszeitnachweis ${$('#auswertenAuto').val()}<br>${monatfuerTage.format('MMMM')}-${moment($('#datum').val(),'YYYY-MM').format('MMMM YYYY')}</h3>`;
  html +=
    '<table class="table table-bordered table-sm"><caption>Gelb = In anderer Station gearbeitet<br>Rot = Notdienst</caption><thead><tr>';
  html += '<th style="width:20%">Tag</th>';
  html += '<th style="width:20%">Beginn</th>';
  html += '<th style="width:20%">Ende</th>';
  html += '<th style="width:20%">Arbeitszeit</th>';
  html += '<th style="width:20%">Gehalt</th></tr></thead><tbody>';

  abrechnungsmonat.forEach(tag => {
    const wochentag = moment(tag.datum, 'DD.MM.YYYY').format('d');
    let wochenende = false;
    if (wochentag === '0' || wochentag === '6') wochenende = true;
    // prettier-ignore
    if (tag.station === false && wochenende === false && tag.notdienst === false)
      html += `<tr>${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
    if (tag.station === false && wochenende === true && tag.notdienst === false)
      html += `<tr class="table-secondary">${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
    if (tag.station === true && tag.notdienst === false)
      html += `<tr class="table-warning">${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
    if (tag.notdienst === true)
      html += `<tr class="table-danger">${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
  });

  // Wiedergeben der Tabelle
  $('#eaText').html(`${html}</tbody></table>`);

  // Tabelle für Sondereinträge
  sonderTabelle.forEach(tag => {
    if (tag.station === false)
      sonderRow += `<tr>${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
    if (tag.station === true)
      sonderRow += `<tr class="table-warning">${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
    if (tag.notdienst === true)
      sonderRow += `<tr class="table-warning">${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
  });

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
  if (sonderRow.length > 0)
    $('#eaText').append(`${sonderEintrag}</tbody></table>`);

  // Zusammenrechnung des Monats aus eaget.php
  $('#eaText').append(
    `<strong>Arbeitszeit:</strong> ${zuStunden(eaDaten.summe.arbeitszeit)}`
  );
  $('#eaText').append(
    `<br><strong>Arbeitstage:</strong> ${eaDaten.summe.datum}`
  );
  const sumGehalt = eaDaten.summe.gehalt;
  $('#eaText').append(`<br><strong>Gehalt:</strong> ${roundTF(sumGehalt)}€`);

  // wieviel bis maximales monatsgehalt / schon drüber
  const gehaltStatus = parseFloat(ahDaten[$('#auswertenAuto').val()].ahStatus);

  // Auch weg
  if (
    ahDaten[$('#auswertenAuto').val()].ahStatus !== 'Student' &&
    // eslint-disable-next-line no-restricted-globals
    isNaN(gehaltStatus)
  )
    fehler(
      'Fehler bei der Durchschnittsberechnung, bitte überprüfe den Status unter "Aushilfen"'
    );

  console.log(ahDaten[$('#auswertenAuto').val()]);
  console.log(eaDaten);

  // Durchschnittsberechnung mit Formel von Eintragen - muss weg
  // Hier ohne Gehalt, weil es sonst doppelt berechnet wird
  if (ahDaten[$('#auswertenAuto').val()].ahStatus !== 'Student') {
    durchschnittBerechnung(
      gehaltStatus,
      ahDaten[$('#auswertenAuto').val()].id,
      0,
      '#eaText',
      () => {
        // Druckbutton
        $('#eaText').append(
          '<br><input type="button" onclick="drucken();" value="Drucken" class="noPrint btn scc my-3">'
        );
      }
    );
  }
}

/*  if (status === '450') {
    const bisMax = 450 - sumGehalt;
    if (sumGehalt <= 450) {
      $('#eaText').append(`<br>Noch ${roundTF(bisMax)}€ bis 450€`);
    } else if (sumGehalt > 450) {
      // prettier-ignore
      $('#eaText').append(`<br><strong style="color:red;">Schon ${roundTF(-bisMax)}€ über 450€</strong>`);
    }
  }
*/

$(document).ready(() => {
  $('nav li').removeClass('current');
  $('#auswerten').addClass('current');

  $('#eaform').submit(e => {
    e.preventDefault();
    $('#fehlerAlert').hide();
    $('#infoAlert').hide();

    const AHName = $('#auswertenAuto').val();
    const { id } = ahDaten[AHName];

    const datum = $('#datum').val();

    $.ajax({
      url: '../api/eaget.php',
      type: 'POST',
      dataType: 'json',
      data: {
        id,
        datum
      }
    })
      .done(eadata => {
        eatabelle(eadata);
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });

  window.onafterprint = () => {
    $('.tabelle-rechts').css('width', '70%');
  };

  getData(daten => {
    ahDaten = daten.ahDaten;
    createAutoComplete('#auswertenAuto', daten.stationNamen);
  });
});
