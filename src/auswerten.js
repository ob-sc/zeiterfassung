import { roundTF, zuStunden, fehler, info } from './funktionen';
import { dataJSON } from './request';

const moment = require('moment');

let html = '';
let sonderRow = '';

let tage = [];
let summe = [];
let eaBeginn = [];
let eaEnde = [];

let ahDaten;

$(document).ajaxComplete(() => {
  ahDaten = dataJSON.responseJSON.ahDaten;
  const { stationNamen } = dataJSON.responseJSON;
});

// DRUCKEN
window.drucken = () => {
  $('.tabelle-rechts').css('width', '100%');
  window.print();
};

function eatabelle() {
  // Ende Funktion wenn keine Einträge
  if (tage.length === 0) {
    info('Keine Einträge für diesen Monat!');
    return;
  }
  // Tage im Monat
  const monatSelect = moment($('#datum').val(), 'YYYY-MM').format('M');
  const monatfuerTage = monatSelect - 1;
  const monatsTage = moment(monatfuerTage, 'M').daysInMonth();
  let eaMonatJahr = eaBeginn;

  const abrechnungsmonat = [];
  const sonderTabelle = [];

  for (let i = 10; i <= monatsTage; i += 1) {
    const tempObjekt = {};
    tempObjekt.datum = `${i}.${eaMonatJahr}`;
    tempObjekt.tag = `<td>${i}.${eaMonatJahr}</td>`;
    tempObjekt.beginn = '<td>&nbsp;</td>';
    tempObjekt.ende = '<td>&nbsp;</td>';
    tempObjekt.arbeitszeit = '<td>&nbsp;</td>';
    tempObjekt.gehalt = '<td>&nbsp;</td>';
    tempObjekt.eintrag = false;
    tempObjekt.station = false; // wird true wenn in anderer station gearbeitet wurde
    abrechnungsmonat.push(tempObjekt);
  }
  eaMonatJahr = eaEnde;
  for (let i = 1; i < 10; i += 1) {
    const tempObjekt = {};
    tempObjekt.datum = `0${i}.${eaMonatJahr}`;
    tempObjekt.tag = `<td>0${i}.${eaMonatJahr}</td>`;
    tempObjekt.beginn = '<td>&nbsp;</td>';
    tempObjekt.ende = '<td>&nbsp;</td>';
    tempObjekt.arbeitszeit = '<td>&nbsp;</td>';
    tempObjekt.gehalt = '<td>&nbsp;</td>';
    tempObjekt.eintrag = false;
    tempObjekt.station = false; // wird true wenn in anderer station gearbeitet wurde
    abrechnungsmonat.push(tempObjekt);
  }

  tage.forEach(tag => {
    const datenbankTag = moment(tag.datum, 'YYYY-MM-DD').format('DD.MM.YYYY');
    abrechnungsmonat.forEach(tabellenTag => {
      if (tabellenTag.datum === datenbankTag) {
        if (tabellenTag.eintrag === false) {
          const tagObjekt = tabellenTag;
          if (tag.station !== tag.ahstation) tagObjekt.station = true;
          tagObjekt.beginn = `<td>${tag.beginn}</td>`;
          tagObjekt.ende = `<td>${tag.ende}</td>`;
          // prettier-ignore
          tagObjekt.arbeitszeit = `<td>${moment.utc().startOf('day').add(tag.arbeitszeit, 'minutes').format('HH:mm')}</td>`;
          tagObjekt.gehalt = `<td>${roundTF(tag.gehalt)}</td>`;
          tagObjekt.eintrag = true;
        } else {
          const sonderObjekt = {};
          if (tag.station !== tag.ahstation) sonderObjekt.station = true;
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
  html = `<h3 style="text-align:center">Arbeitszeitnachweis ${$('#nameInput').val()}<br>${moment(monatfuerTage, 'M').format('MMMM')}-${moment($('#datum').val(),'YYYY-MM').format('MMMM YYYY')}</h3>`;
  html +=
    '<table class="table table-bordered table-sm" style="width:100%"><caption>Gelb = In anderer Station gearbeitet</caption><thead><tr>';
  html += '<th style="width:20%">Tag</th>';
  html += '<th style="width:20%">Beginn</th>';
  html += '<th style="width:20%">Ende</th>';
  html += '<th style="width:20%">Arbeitszeit</th>';
  html += '<th style="width:20%">Gehalt</th></tr></thead><tbody>';

  abrechnungsmonat.forEach(tag => {
    const wochentag = moment(tag.datum, 'DD.MM.YYYY').format('d');
    let wochenende = false;
    if (wochentag === '0' || wochentag === '6') wochenende = true;
    if (tag.station === false && wochenende === false)
      html += `<tr>${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
    if (tag.station === false && wochenende === true)
      html += `<tr class="table-info">${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
    if (tag.station === true)
      html += `<tr class="table-warning">${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
  });

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

  sonderTabelle.forEach(tag => {
    if (tag.station === false)
      sonderRow += `<tr>${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
    if (tag.station === true)
      sonderRow += `<tr class="table-warning">${tag.tag}${tag.beginn}${tag.ende}${tag.arbeitszeit}${tag.gehalt}</tr>`;
  });

  // Wenn die Tabelle Sondereinträge nicht leer ist -> diese wiedergeben
  if (sonderRow.length > 0)
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
  if (sumGehalt <= roundTF(statusMax)) {
    $('#eaText').append(
      `<br>Noch ${roundTF(bisMax)}€ bis ${roundTF(statusMax)}€<br>`
    );
  } else if (sumGehalt > roundTF(statusMax)) {
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

  window.onafterprint = () => {
    $('.tabelle-rechts').css('width', '70%');
  };
});
