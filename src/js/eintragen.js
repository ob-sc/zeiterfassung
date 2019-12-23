import {
  session,
  getData,
  createAutoComplete,
  roundTF,
  info,
  fehler
} from './funktionen';

const moment = require('moment');

moment.locale('de');

let alleDaten;

const fbData = {};

let notdienst = false;

session('norm');

window.senden = () => {
  $.ajax({
    url: '../api/send.php',
    method: 'POST',
    data: fbData
  })
    .done(data => {
      info(data);
      $('#eform')[0].reset();
      document.getElementById('datum').valueAsDate = new Date();
      $('#etext').html('');
    })
    .fail(data => {
      fehler(data.responseText);
    });

  $('#esend').hide();
};

function formBerechnung() {
  const ausName = $('#eintragenAuto').val();
  fbData.ausName = ausName;

  // Check ob Aushilfe existiert
  if (!alleDaten[ausName]) return fehler('Aushilfe nicht gefunden!');

  // Station der Aushilfe
  fbData.ahStation = alleDaten[ausName].station;

  fbData.aushilfenId = alleDaten[ausName].id;

  $('#etext').html(`<p><strong>Name:</strong> ${ausName}</p>`);

  const { norlohn } = alleDaten[ausName];
  const { samlohn } = alleDaten[ausName];
  const { sonlohn } = alleDaten[ausName];
  let lohn;

  fbData.datum = $('#datum').val();
  $('#etext').append(
    `<p><strong>Datum:</strong> ${moment(fbData.datum).format(
      'DD.MM.YYYY'
    )}</p>`
  );

  // Keine Daten vor Abrechnungszeitraum Januar 2019 (17.12.2019)
  if (
    moment(fbData.datum).isBefore(moment('17.12.2019', 'DD.MM.YYYY')) === true
  )
    return fehler(
      'Datum ist im Abrechnungszeitraum 2019. Bitte nur Datum ab dem 17.12.2019 eintragen. Siehe Mail von Melanie vom 17.12.2019'
    );

  // Check ob Datum in der Zukunft ist
  if (moment(fbData.datum).isAfter(new Date(), 'day') === true)
    return fehler('Datum ist in der Zukunft!');

  $('#etext').append(
    `<p><strong>Wochentag:</strong> ${moment(fbData.datum).format('dddd')}</p>`
  );

  if (!notdienst) {
    const beginn = moment($('#beginn').val(), 'HH:mm');
    fbData.beginnForm = moment(beginn).format('HH:mm');
    $('#etext').append(`<p><strong>Beginn:</strong> ${fbData.beginnForm}</p>`);

    const ende = moment($('#ende').val(), 'HH:mm');
    fbData.endeForm = moment(ende).format('HH:mm');
    $('#etext').append(`<p><strong>Ende:</strong> ${fbData.endeForm}</p>`);

    fbData.diff = ende.diff(beginn, 'minutes');
    $('#etext').append(
      `<p><strong>Arbeitszeit:</strong> ${moment
        .utc(ende.diff(beginn))
        .format('HH:mm')}</p>`
    );

    // Check ob AZ 0 oder negativ
    if (fbData.diff < 1) return fehler('Beginn und Ende überprüfen!');

    // Gehalt
    if (moment(fbData.datum).isoWeekday() === 7) {
      lohn = sonlohn;
    } else if (moment(fbData.datum).isoWeekday() === 6) {
      lohn = samlohn;
    } else {
      lohn = norlohn;
    }
    // Berechnung in Cent, da sonst falsch gerundet wird
    const gehaltNoRund = (lohn * 100 * fbData.diff) / 60 / 100;
    fbData.gehalt = roundTF(gehaltNoRund);
    $('#etext').append(`<p><strong>Gehalt:</strong> ${fbData.gehalt}€</p>`);
  }

  if (notdienst) {
    fbData.beginnForm = 'nd';
    fbData.endeForm = 'nd';
    fbData.diff = 0;

    const menge = $('#anzahl').val();
    $('#etext').append(`<p><strong>Einsätze:</strong> ${menge}</p>`);

    fbData.gehalt = 40 * menge;
    $('#etext').append(`<p><strong>Gehalt:</strong> ${fbData.gehalt}€</p>`);
  }

  // durchschnitt
  if (alleDaten[ausName].ahStatus === '450') {
    const jetzt = moment();

    const jahr = jetzt;

    // letzter tag im abrechnungszeitraum des aktuellen jahres
    const letzterTagAktuell = moment(
      `${jetzt.format('YYYY')}-12-16`,
      'YYYY-MM-DD'
    );

    // wenn heute schon im neuen Abrechnungszeitraum ist (Januar Folgejahr) also nach letzterTagAktuell
    if (jetzt.isAfter(letzterTagAktuell)) jahr.add(1, 'years');

    // letzter tag im abrechnungszeitraum
    const letzterTag = moment(`${jahr.format('YYYY')}-12-16`, 'YYYY-MM-DD');

    // erster tag im abrechnungszeitraum
    const ersterTag = moment(
      `${jahr.subtract(1, 'years').format('YYYY')}-12-17`,
      'YYYY-MM-DD'
    );

    // gesamt tage im jahr
    const ganzesJahrTage = letzterTag.diff(ersterTag, 'days');

    // so viele tage im Abrechnungszeitraum schon vergangen
    const tageVergangen = jetzt.diff(ersterTag, 'days');

    // max gehalt im gesamten jahr
    const maxGehaltJetzt = (5400 / ganzesJahrTage) * tageVergangen;

    $.ajax({
      url: '../api/emedian.php',
      method: 'POST',
      data: {
        ersterTag: ersterTag.format('YYYY-MM-DD'),
        letzterTag: letzterTag.format('YYYY-MM-DD'),
        id: fbData.aushilfenId
      }
    })
      .done(data => {
        // gehalt dieses Jahr (summe)
        const durchschnittJSON = JSON.parse(data);
        const summe = durchschnittJSON[0].gehalt + parseFloat(fbData.gehalt);

        // erechnen des durchschnitts
        const durchschnitt = maxGehaltJetzt - summe;

        if (durchschnitt >= 0)
          $('#etext').append(
            `<p><strong>${roundTF(
              durchschnitt
            )}€</strong> unter dem Durchschnitt</p>`
          );
        else
          $('#etext').append(
            `<p><strong style="color:#c90000">${roundTF(durchschnitt) *
              -1}€ über dem Durchschnitt</strong></p>`
          );
      })
      .fail(data => {
        fehler(data.responseText);
      });
  }

  // senden knopf zeigen
  return $('#esend').show();
}

$(document).ready(() => {
  $('nav li').removeClass('current');
  $('#eintragen').addClass('current');

  $('#ndCheck').change(e => {
    if (e.currentTarget.checked === true) {
      $('#zeit').hide();
      $('#menge').show();
      $('#beginn, #ende').removeAttr('required');
      notdienst = true;
    } else {
      $('#zeit').show();
      $('#menge').hide();
      $('#beginn, #ende').prop('required', true);
      notdienst = false;
    }
  });

  $('#eform').submit(e => {
    e.preventDefault();
    $('#fehlerAlert').hide();
    $('#infoAlert').hide();
    formBerechnung();
  });

  $('#eform').change(() => {
    $('#esend').hide();
  });

  getData(daten => {
    alleDaten = daten.alleDaten;
    createAutoComplete('#eintragenAuto', daten.stationNamen, daten.alleNamen);
  });
});
