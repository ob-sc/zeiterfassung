import { getData, fehler, info } from './funktionen';

const moment = require('moment');

moment.locale('de');

/* für we iwie den zeitraum festlegen -> aktueller monat oder select? */

// WE-Daten in Tabelle
function weTabelle() {
  $.getJSON('../api/weget.php').done(daten => {
    let weTab = '';

    console.log(daten);

    if (daten.length === 0) {
      info('Keine Einträge');
      $('#weTab').html('');
    }

    daten.forEach(key => {
      // prettier-ignore
      weTab += `<tr><td class="text-center">${moment(key.datum, 'YYYY-MM-DD').format('DD.MM.YYYY')}</td>`;
      weTab += `<td>${key.name}</td>`;
      weTab += `<td class="text-center">${key.stunden}</td>`;
      weTab += `<td class="text-center">${key.ausgleich}</td>`;
      weTab += `<th class="text-center"><img src="../img/trash-alt-regular.svg" width="18" class="delete" data-weid="${key.id}"></th></tr>`;

      $('#weTab').html(weTab);

      $('.delete').click(e => {
        const weId = e.currentTarget.dataset.weid;

        $.ajax({
          url: '../api/wedelete.php',
          method: 'POST',
          data: { id: weId }
        })
          .done(() => {
            weTabelle();
          })
          .fail(data => {
            fehler(data.responseText);
          });
      });
    });
  });
}

$(document).ready(() => {
  $('nav li').removeClass('current');
  $('#mitarbeiter').addClass('current');

  $('#wochenende').click(() => {
    $('#maContainer').hide();
    $('#weContainer').show();

    weTabelle();
  });

  // MA-Daten in Tabelle
  getData(daten => {
    const { maDaten } = daten;
    let maRow;
    maDaten.forEach(key => {
      if (key.status === 'neu') {
        maRow += `<tr class="table-danger"><td>${key.username}</td>`;
        maRow += '<td class="text-center">Neu</td>';
        maRow += `<th class="text-center"><img src="../img/check-square-regular.svg" width="18" class="confirm" data-confirmid="${key.id}"></th>`;
        maRow += `<th class="text-center"><img src="../img/edit-regular.svg" width="18" class="edit" data-pwid="${key.id}"></th>`;
        maRow += `<th class="text-center"><img src="../img/trash-alt-regular.svg" width="18" class="delete" data-deleteid="${key.id}"></th></tr>`;
      } else {
        maRow += `<tr><td>${key.username}</td>`;
        maRow += '<td class="text-center">Bestätigt</td>';
        maRow += '<td>&nbsp</td>';
        maRow += `<th class="text-center"><img src="../img/edit-regular.svg" width="18" class="edit" data-pwid="${key.id}"></th>`;
        maRow += `<th class="text-center"><img src="../img/trash-alt-regular.svg" width="18" class="delete" data-deleteid="${key.id}"></th></tr>`;
      }
    });
    $('#maTab').html(maRow);

    // MA bestätigen
    // eslint-disable-next-line func-names
    $('.confirm').click(function() {
      const maid = $(this).data('confirmid');

      $.ajax({
        url: '../api/maedit.php',
        method: 'POST',
        data: { id: maid }
      })
        .done(() => {
          window.location.reload();
        })
        .fail(data => {
          fehler(data.responseText);
        });
    });

    // PW bearbeiten
    // eslint-disable-next-line func-names
    $('.edit').click(function() {
      $('#pwModal').modal();

      const pwid = $(this).data('pwid');

      $('#pwForm').submit(e => {
        e.preventDefault();

        $('#pwLaenge').hide();
        $('#pwGleich').hide();

        const pw1 = $('#pw1').val();
        const pw2 = $('#pw2').val();

        if (pw1.length < 6) {
          $('#pwLaenge').show();
          return;
        }
        if (pw1 !== pw2) {
          $('#pwGleich').show();
          return;
        }

        $.ajax({
          url: '../api/mapw.php',
          method: 'POST',
          data: { id: pwid, password: pw1 }
        })
          .done(data => {
            $('#pwForm')[0].reset();
            $('#pwModal').modal('hide');
            info(data);
          })
          .fail(data => {
            fehler(data.responseText);
          });
      });
    });

    // MA löschen
    // eslint-disable-next-line func-names
    $('.delete').click(function() {
      const deleteid = $(this).data('deleteid');

      $.ajax({
        url: '../api/madelete.php',
        method: 'POST',
        data: { id: deleteid }
      })
        .done(() => {
          window.location.reload();
        })
        .fail(data => {
          fehler(data.responseText);
        });
    });
  });

  // WE eintragen-knopf
  $('#weEintragen').click(() => {
    $('#weModal').modal();
  });

  $('#weForm').submit(e => {
    e.preventDefault();

    $.ajax({
      url: '../api/weeintragen.php',
      method: 'POST',
      data: $('#weForm').serialize()
    })
      .done(data => {
        $('#weForm')[0].reset();
        $('#weModal').modal('hide');
        info(data);
        weTabelle();
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });
});
