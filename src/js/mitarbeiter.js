import * as JsPDF from 'jspdf';
import 'jspdf-autotable';
import { getData, fehler, info } from './funktionen';

const moment = require('moment');

moment.locale('de');

let station;

// WE-Daten in Tabelle
function weTabelle() {
  $.ajax({
    url: '../api/weget.php',
    method: 'POST',
    data: { monat: $('#monat').val() }
  }).done(daten => {
    let weTab = '';

    $('#pdfBtn').hide();

    const weDaten = JSON.parse(daten);

    if (weDaten.length === 0) {
      $('#weTab').html('');
      return info('Keine Einträge');
    }

    return weDaten.forEach(key => {
      // prettier-ignore
      weTab += `<tr><td class="text-center">${moment(key.datum, 'YYYY-MM-DD').format('DD.MM.YYYY')}</td>`;
      weTab += `<td>${key.name}</td>`;
      weTab += `<td class="text-center">${key.stunden}</td>`;
      weTab += `<td class="text-center">${key.ausgleich}</td>`;
      weTab += `<th class="text-center"><img src="../img/trash-alt-regular.svg" width="18" class="delete" data-weid="${key.id}"></th></tr>`;

      $('#pdfBtn').show();

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

window.printpdf = () => {
  // prettier-ignore
  const titel = `Wochenendliste ${station}, ${moment($('#monat').val(), 'YYYY-MM').format('MMMM YYYY')}`

  $('.hideTD').hide();

  const doc = new JsPDF();
  doc.autoTable({
    html: '#weTabelle',
    theme: 'plain',
    styles: { lineWidth: 0.1 },
    didDrawPage: () => {
      doc.text(titel, 14, 10);
    }
  });

  doc.save(`${titel}.pdf`);

  $('.hideTD').show();
};

$(document).ready(() => {
  $('nav li').removeClass('current');
  $('#mitarbeiter').addClass('current');

  document.getElementById('monat').valueAsDate = new Date();

  $('#wochenende').click(() => {
    $('#maContainer').hide();
    $('#weContainer').show();

    weTabelle();
  });

  $('#monat').change(() => {
    $('#infoAlert').hide();
    weTabelle();
  });

  // MA-Daten in Tabelle
  getData(daten => {
    const { maDaten } = daten;
    station = daten.station;

    let maRow;

    maDaten.forEach(key => {
      if (key.status === 'neu') {
        maRow += `<tr class="table-danger"><td>${key.username}</td>`;
        maRow += '<td class="text-center">Neu</td>';
        maRow += `<th class="text-center"><img src="../img/check-square-regular.svg" width="18" class="confirm" data-confirmid="${key.id}"></th>`;
        maRow += `<th class="text-center"><img src="../img/edit-regular.svg" width="18" class="edit" data-pwid="${key.id}"></th>`;
        maRow += `<th class="text-center"><img src="../img/trash-alt-regular.svg" width="18" class="delete" data-deletename="${key.username}" data-deleteid="${key.id}"></th></tr>`;
      } else if (key.status === 'sl') {
        maRow += `<tr><td>${key.username}</td>`;
        maRow += '<td class="text-center">Bestätigt</td>';
        maRow += '<td>&nbsp</td>';
        maRow += `<th class="text-center"><img src="../img/edit-regular.svg" width="18" class="edit" data-pwid="${key.id}"></th>`;
        maRow += `<th class="text-center hideTD">&nbsp</th></tr>`;
      } else {
        maRow += `<tr><td>${key.username}</td>`;
        maRow += '<td class="text-center">Bestätigt</td>';
        maRow += '<td>&nbsp</td>';
        maRow += `<th class="text-center"><img src="../img/edit-regular.svg" width="18" class="edit" data-pwid="${key.id}"></th>`;
        maRow += `<th class="text-center hideTD"><img src="../img/trash-alt-regular.svg" width="18" class="delete" data-deletename="${key.username}" data-deleteid="${key.id}"></th></tr>`;
      }
    });
    $('#maTab').html(maRow);

    // MA bestätigen
    $('.confirm').click(e => {
      const maid = e.currentTarget.dataset.confirmid;

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
    $('.edit').click(e => {
      $('#pwModal').modal();

      const { pwid } = e.currentTarget.dataset;

      $('#pwForm').submit(f => {
        f.preventDefault();

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

    // MA löschen,
    $('.delete').click(e => {
      const { deleteid } = e.currentTarget.dataset;
      const { deletename } = e.currentTarget.dataset;

      $('#deleteName').html(deletename);
      $('#deleteModal').modal();

      $('#deleteConfirm').click(() => {
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
  });

  // WE eintragen-knopf
  $('#weEintragen').click(() => {
    $('#weModal').modal();
  });

  $('#weForm').submit(e => {
    e.preventDefault();

    // prettier-ignore
    if (moment($('#datum').val(), 'YYYY-MM-DD').isoWeekday() !== 7) {
      $('#weModal').modal('hide');
      return fehler(`${moment($('#datum').val(), 'YYYY-MM-DD').format('DD.MM.YYYY')} ist kein Sonntag`)
    }

    return $.ajax({
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
