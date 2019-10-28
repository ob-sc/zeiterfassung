moment.locale('de');

// sortieren
const firstBy = (function() {
  function n(n) {
    return n;
  }
  function t(n) {
    return 'string' === typeof n ? n.toLowerCase() : n;
  }
  function r(r, e) {
    if (
      ((e = 'number' === typeof e ? { direction: e } : e || {}),
      'function' !== typeof r)
    ) {
      let u = r;
      r = function(n) {
        return n[u] ? n[u] : '';
      };
    }
    if (1 === r.length) {
      let i = r;
      let o = e.ignoreCase ? t : n;
      r = function(n, t) {
        return o(i(n)) < o(i(t)) ? -1 : o(i(n)) > o(i(t)) ? 1 : 0;
      };
    }
    return -1 === e.direction
      ? function(n, t) {
          return -r(n, t);
        }
      : r;
  }
  function e(n, t) {
    return (n = r(n, t)), (n.thenBy = u), n;
  }
  function u(n, t) {
    let u = this;
    return (
      (n = r(n, t)),
      e(function(t, r) {
        return u(t, r) || n(t, r);
      })
    );
  }
  return e;
})();
// prepare sort by nachname
const sortByNachname = firstBy('nachname');

// Fehler Alert
function fehler(tx) {
  $('#fehlerText').html(tx);
  $('#fehlerAlert').fadeIn('fast');
  $('#fehlerClose').click(() => {
    $('#fehlerAlert').fadeOut('fast');
  });
}

// Info Alert
function info(tx) {
  $('#infoText').html(tx);
  $('#infoAlert').fadeIn('fast');
  $('#infoClose').click(() => {
    $('#infoAlert').fadeOut('fast');
  });
}

// CONFIG
$.get('../scripts/getconfig.php', data => {
  const config = JSON.parse(data);
  const { settings } = config.daten;
  if (settings.devmode == 1) $('.header, .footer').css('background', '#D4E6F1'); // 1 ist string aus json
});

// namen, löhne und station für alle
$.get('../scripts/getdata.php', data => {
  const result = JSON.parse(data);
  stationNamen = result.stationNamen;
  alleNamen = result.alleNamen;
  ahDaten = result.ahDaten;
  alleDaten = result.alleDaten;
  maDaten = result.maDaten;
  stationid = result.stationid;
  station = result.station;
  status = result.status;
});

// moment.js duration kann man nicht auf HH:mm formatieren. Daher string aus arbeitszeit minuten:
function zuStunden(azMinuten) {
  let stunden = Math.floor(azMinuten / 60);
  let minuten = azMinuten % 60;
  if (stunden < 10) stunden = `0${stunden}`;
  if (minuten < 10) minuten = `0${minuten}`;
  const azString = `${stunden}:${minuten}`;
  return azString;
}

// DRUCKEN
function drucken() {
  $('.tabelle-rechts').css('width', '100%');
  window.print();
}

// RUNDEN to fixed 2 / return als string
const roundTF = v => {
  // value als string
  const value = String(v);

  // wenn kein . dann return mit 2 nullen
  if (!value.includes('.')) return `${value}.00`;

  // trennen bei "."
  const values = value.split('.');
  const decimal = values[0];
  const decimalPlaceTotal = values[1];
  const twoPlaces = decimalPlaceTotal.substr(0, 2);

  // Prüfen auf kleiner drei Nachkommastellen
  if (decimalPlaceTotal.length < 3) {
    return String(`${decimal}.${twoPlaces.padEnd(2, '0')}`);
  }

  // dritte Nachkommastelle zur Prüfung auf- oder abrunden
  const decider = parseInt(decimalPlaceTotal[2], 10);

  // prüfen, ob auf- oder abrunden
  if (decider < 5) {
    return String(`${decimal}.${twoPlaces}`);
  }

  // Prüfen ob Dezimalsprung
  if (twoPlaces === '99') {
    let decimalRoundedUp = parseInt(decimal, 10);
    decimalRoundedUp += 1;
    return String(`${decimalRoundedUp}.00`);
  }

  // prüfen ob erste Stelle nicht Null
  if (decimalPlaceTotal[0] !== '0') {
    // "einfach" aufrunden
    let roundedUp = parseInt(twoPlaces, 10);
    roundedUp += 1;
    return String(`${decimal}.${roundedUp}`);
  }

  // letzte Stelle zur Prüfung aufrunden
  let lastPlace = parseInt(decimalPlaceTotal[1], 10);
  lastPlace += 1;
  // prüfen ob Zehnersprung nach Aufrunden, dann zweistellig zurückgeben
  if (lastPlace > 9) {
    return String(`${decimal}.${lastPlace}`);
  }

  // wenn kein Zehnersprung, dann "0" und einstellig zurückgeben
  return String(`${decimal}.0${lastPlace}`);
};

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

// AUSHILFEN bearbeiten
// Erstellen der Tabelle, jedes td hat ID mit Personal-ID für den Inhalt
function ahBearbeiten() {
  let ahRow;
  for (const x in ahDaten) {
    ahRow += `<tr><td>${ahDaten[x].personalnr}</td>`;
    ahRow += `<td>${x}</td>`;
    ahRow += `<td class="editable" contenteditable="false" id="nor${
      ahDaten[x].id
    }">${roundTF(ahDaten[x].norlohn)}</td>`;
    ahRow += `<td class="editable" contenteditable="false" id="sam${
      ahDaten[x].id
    }">${roundTF(ahDaten[x].samlohn)}</td>`;
    ahRow += `<td class="editable" contenteditable="false" id="son${
      ahDaten[x].id
    }">${roundTF(ahDaten[x].sonlohn)}</td>`;
    ahRow += `<th><img src="../img/edit.svg" width="18" class="edit" id="${ahDaten[x].id}"></th></tr>`;
  }
  $('#ahTab').html(ahRow);

  // Bei klick auf Bearbeiten-img
  $('.edit').click(() => {
    const editableTD = $(this)
      .parents('tr')
      .find('td.editable');
    id = $(this).attr('id');

    // Alle anderen gelben Zeilen abwählen
    $('.edit')
      .not(this)
      .each(() => {
        $(this)
          .parents('tr')
          .find('td.editable')
          .prop('contenteditable', false);
        $(this)
          .parents('tr')
          .removeClass('table-warning');
        $(this).attr('src', '../img/edit.svg');
      });

    // Bei Stift-Bild: Zeile kann bearbeitet werden, ändert sich auf speichern
    if ($(this).attr('src') === '../img/edit.svg') {
      $.each(editableTD, () => {
        $(this).prop('contenteditable', true);
      });
      $(this)
        .parents('tr')
        .addClass('table-warning');
      $(this).attr('src', '../img/save.svg');
      return;
    }

    // Bei Disketten-Bild: Zeile wird gespeichert -> variablen aus IDs der Zellen werden erstellt und dann per ajax an php gesendet

    if ($(this).attr('src') === '../img/save.svg') {
      $.each(editableTD, () => {
        $(this).prop('contenteditable', false);
      });
      $(this)
        .parents('tr')
        .removeClass('table-warning');
      $(this).attr('src', '../img/edit.svg');

      // Werte aus contenteditable Feldern
      const norval = $(`#nor${id}`).text();
      const samval = $(`#sam${id}`).text();
      const sonval = $(`#son${id}`).text();

      // Objekt mit Daten an ajax
      const ahEdit = {
        id,
        norlohn: norval.replace(',', '.'),
        samlohn: samval.replace(',', '.'),
        sonlohn: sonval.replace(',', '.')
      };

      // Senden an aedit.php
      $.ajax({
        url: 'aedit.php',
        method: 'POST',
        data: ahEdit
      })
        .done(() => {
          location.reload();
        })
        .fail(data => {
          fehler(data.responseText);
        });
    }
  });

  // Bei Enter: keine neue Zeile
  $('td[contenteditable]').keydown(e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      $(this).blur();
    }
  });
}

$(document).ready(() => {
  // für jeden input Datum - automatisch Datum heute
  const datumInput = document.getElementById('datum');
  if (datumInput) datumInput.valueAsDate = new Date();

  // NACH DRUCKEN
  window.onafterprint = () => {
    $('.tabelle-rechts').css('width', '70%');
  };

  // AUSHILFEN anlegen / senden an anew.php
  $('#newForm').submit(e => {
    e.preventDefault();
    // Check ob Aushilfe schon existiert
    name = String(`${$('#vorn').val()} ${$('#nachn').val()}`);
    if (ahDaten[name] != undefined) {
      fehler('Aushilfe existiert bereits!');
      return;
    }

    $.ajax({
      url: 'anew.php',
      method: 'POST',
      data: $('#newForm').serialize()
    })
      .done(data => {
        info(data);
        $('#newForm')[0].reset();
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });

  // AUSHILFEN personalnummer
  $('#ahpnForm').submit(e => {
    e.preventDefault();
    $.ajax({
      url: 'ahpn.php',
      method: 'POST',
      data: $('#ahpnForm').serialize()
    })
      .done(() => {
        location.reload();
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });
});

$(document).ajaxComplete(() => {
  // AUTOCOMPLETE - Station
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

  // AUTOCOMPLETE - Alle
  $('#alleInput').autoComplete({
    minChars: 1,
    delay: 0,
    source(term, suggest) {
      term = term.toLowerCase();
      let matches = [];
      for (let i = 0; i < alleNamen.length; i++)
        if (~alleNamen[i].toLowerCase().indexOf(term))
          matches.push(alleNamen[i]);
      suggest(matches);
    }
  });

  // ADMIN / SL für Menü
  if (status == 'admin') $('#admin').show();
  if (status == 'admin' || status == 'sl') $('.priv').removeClass('disabled');

  // AUSHILFEN bearbeiten
  ahBearbeiten();
  // personalnummern
  let ahpnRow;
  for (const x in ahDaten) {
    if (ahDaten[x].personalnr === 0) {
      ahpnRow += `<tr><td>${x}</td>`;
      ahpnRow += `<td><input type="number" class="form-control" style="height:25px;" name="${ahDaten[x].id}"></td></tr>`;
    }
  }
  $('#ahpnTab').html(ahpnRow);

  // MITARBEITER bearbeiten
  let maRow;
  for (const x in maDaten) {
    if (maDaten[x].status == 'neu') {
      maRow += `<tr class="table-danger"><td>${maDaten[x].username}</td>`;
      maRow += `<td>${maDaten[x].status}</td>`;
      maRow += `<th><img src="../img/confirm.svg" width="18" class="confirm" id="${maDaten[x].id}"></th></tr>`;
    } else {
      maRow += `<tr><td>${maDaten[x].username}</td>`;
      maRow += '<td>Bestätigt</td>';
      maRow += '<td>&nbsp</td></tr>';
    }
  }
  $('#maTab').html(maRow);

  $('.confirm').click(() => {
    id = $(this).attr('id');
    $.ajax({
      url: 'maedit.php',
      method: 'POST',
      data: { id }
    })
      .done(() => {
        location.reload();
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });
});
