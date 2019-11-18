import { roundTF, fehler, info } from './funktionen';
import dataJSON from './request';

const sortBy = require('lodash.sortby');

let ahDaten;

$(document).ajaxComplete(() => {
  ahDaten = dataJSON.responseJSON.ahDaten;
});

// Erstellen der Tabelle, jedes td hat ID mit Personal-ID für den Inhalt
function ahBearbeiten() {
  let ahRow;

  ahDaten = sortBy(ahDaten, [o => o.nachname]);

  ahDaten.forEach(key => {
    ahRow += `<tr><td>${key.personalnr}</td>`;
    ahRow += `<td>${key.nachname}, ${key.vorname}</td>`;
    ahRow += `<td class="editable" contenteditable="false" id="nor${
      key.id
    }">${roundTF(key.norlohn)}</td>`;
    ahRow += `<td class="editable" contenteditable="false" id="sam${
      key.id
    }">${roundTF(key.samlohn)}</td>`;
    ahRow += `<td class="editable" contenteditable="false" id="son${
      key.id
    }">${roundTF(key.sonlohn)}</td>`;
    ahRow += `<th><img src="../img/user-edit-solid.svg" width="18" class="edit" data-editid="${key.id}"></th>`;
    ahRow += `<th><img src="../img/user-minus-solid.svg" width="18" class="delete" data-deletename="${key.vorname} ${key.nachname}" data-deleteid="${key.id}"></th></tr>`;
  });
  $('#ahTab').html(ahRow);

  // Bei klick auf Bearbeiten-img
  // eslint-disable-next-line func-names
  $('.edit').click(function() {
    const editableTD = $(this)
      .parents('tr')
      .find('td.editable');
    const id = $(this).data('editid');

    // Alle anderen gelben Zeilen abwählen
    $('.edit')
      .not(this)
      // eslint-disable-next-line func-names
      .each(function() {
        $(this)
          .parents('tr')
          .find('td.editable')
          .prop('contenteditable', false);
        $(this)
          .parents('tr')
          .removeClass('table-warning');
        $(this).attr('src', '../img/user-edit-solid.svg');
      });

    // Bei Stift-Bild: Zeile kann bearbeitet werden, ändert sich auf speichern
    if ($(this).attr('src') === '../img/user-edit-solid.svg') {
      // eslint-disable-next-line func-names
      $.each(editableTD, function() {
        $(this).prop('contenteditable', true);
      });
      $(this)
        .parents('tr')
        .addClass('table-warning');
      $(this).attr('src', '../img/user-check-solid.svg');
      return;
    }

    // Bei Disketten-Bild: Zeile wird gespeichert -> variablen aus IDs der Zellen werden erstellt und dann per ajax an php gesendet

    if ($(this).attr('src') === '../img/user-check-solid.svg') {
      // eslint-disable-next-line func-names
      $.each(editableTD, function() {
        $(this).prop('contenteditable', false);
      });
      $(this)
        .parents('tr')
        .removeClass('table-warning');
      $(this).attr('src', '../img/user-edit-solid.svg');

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

  // eslint-disable-next-line func-names
  $('.delete').click(function() {
    const deleteId = $(this).data('deleteid');
    const deletename = $(this).data('deletename');

    $('#deleteName').html(deletename);
    $('#deleteModal').modal();

    // eslint-disable-next-line func-names
    $('#deleteConfirm').click(function() {
      $.ajax({
        url: 'adelete.php',
        method: 'POST',
        data: { id: deleteId }
      })
        .done(() => {
          window.location.reload();
        })
        .fail(data => {
          fehler(data.responseText);
        });
    });
    // Senden an adelete.php
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
    const ahName = `${$('#vorn').val()} ${$('#nachn').val()}`;
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
