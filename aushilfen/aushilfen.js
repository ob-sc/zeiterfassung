/* global roundTF, fehler, info */

let ahDaten = {};

// namen, löhne und station für alle
$.get('../scripts/getdata.php', data => {
  const result = JSON.parse(data);
  ahDaten = result.ahDaten;
});

// Erstellen der Tabelle, jedes td hat ID mit Personal-ID für den Inhalt
function ahBearbeiten() {
  let ahRow;
  Object.entries(ahDaten).forEach(([key, value]) => {
    ahRow += `<tr><td>${value.personalnr}</td>`;
    ahRow += `<td>${key}</td>`;
    ahRow += `<td class="editable" contenteditable="false" id="nor${
      value.id
    }">${roundTF(value.norlohn)}</td>`;
    ahRow += `<td class="editable" contenteditable="false" id="sam${
      value.id
    }">${roundTF(value.samlohn)}</td>`;
    ahRow += `<td class="editable" contenteditable="false" id="son${
      value.id
    }">${roundTF(value.sonlohn)}</td>`;
    ahRow += `<th><img src="../img/edit.svg" width="18" class="edit" id="${value.id}"></th></tr>`;
  });
  $('#ahTab').html(ahRow);

  // Bei klick auf Bearbeiten-img
  $('.edit').click(function() {
    const editableTD = $(this)
      .parents('tr')
      .find('td.editable');
    const id = $(this).attr('id');

    // Alle anderen gelben Zeilen abwählen
    $('.edit')
      .not(this)
      .each(function() {
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
      $.each(editableTD, function() {
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
      $.each(editableTD, function() {
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
          window.location.reload();
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
      e.currentTarget.blur();
    }
  });
}

$(document).ready(() => {
  // anlegen / senden an anew.php
  $('#newForm').submit(e => {
    e.preventDefault();
    // Check ob Aushilfe schon existiert
    const ahName = String(`${$('#vorn').val()} ${$('#nachn').val()}`);
    if (ahDaten[ahName] !== undefined) {
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

  // personalnummer
  $('#ahpnForm').submit(e => {
    e.preventDefault();
    $.ajax({
      url: 'ahpn.php',
      method: 'POST',
      data: $('#ahpnForm').serialize()
    })
      .done(() => {
        window.location.reload();
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });
});

$(document).ajaxComplete(() => {
  ahBearbeiten();
  // personalnummern
  let ahpnRow;
  Object.entries(ahDaten).forEach(([key, value]) => {
    if (value.personalnr === 0) {
      ahpnRow += `<tr><td>${key}</td>`;
      ahpnRow += `<td><input type="number" class="form-control" style="height:25px;" name="${value.id}"></td></tr>`;
    }
  });
  $('#ahpnTab').html(ahpnRow);
});
