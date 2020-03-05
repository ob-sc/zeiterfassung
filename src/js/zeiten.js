import 'datatables.net';
import 'datatables.net-bs4';

import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

import './datetime-moment';

import { session, roundTF, zuStunden, fehler, info } from './funktionen';

const moment = require('moment');

moment.locale('de');

let status = '';

session('sl');

session('sl', data => {
  status = data.userStatus;
});

$.fn.dataTable.ext.search.push((settings, data) => {
  const min = moment($('#min').val(), 'YYYY-MM-DD');
  const max = moment($('#max').val(), 'YYYY-MM-DD');
  const date = moment(data[0], 'DD.MM.YYYY') || '';

  if (
    (min.isValid() === false && max.isValid() === false) || // nd && nd
    (min.isValid() === false && date.diff(max) <= 0) || // nd && date <= max
    (min.diff(date) <= 0 && max.isValid() === false) || // min <= date && nd
    (min.diff(date) <= 0 && date.diff(max) <= 0) // min <= date && date <= max
  )
    return true;

  return false;
});

$.getJSON('../api/zeitenget.php')
  .done(daten => {
    const zeiten = [];

    daten.forEach(element => {
      const datum = moment(element.datum, 'YYYY-MM-DD').format('DD.MM.YYYY');
      const az = zuStunden(element.arbeitszeit);
      const gehalt = roundTF(element.gehalt);
      // prettier-ignore
      const regDate = moment(element.reg_date, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY HH:mm:ss');

      const row = [
        datum,
        element.name,
        element.beginn,
        element.ende,
        az,
        gehalt,
        element.username,
        regDate,
        `<img src="../img/times-circle-regular.svg" width="18" class="delete" data-deleteid="${element.id}">`
      ];

      zeiten.push(row);
    });

    $(document).ready(() => {
      $.fn.dataTable.moment('DD.MM.YYYY', 'de');

      const datatable = $('#zeitenDataTable').DataTable({
        data: zeiten,
        order: [0, 'desc'],
        columnDefs: [
          { targets: -1, className: 'text-center', orderable: false }
        ],
        language: {
          sEmptyTable: 'Keine Daten in der Tabelle vorhanden',
          sInfo: '_START_ bis _END_ von _TOTAL_ Einträgen',
          sInfoEmpty: 'Keine Daten vorhanden',
          sInfoFiltered: '(gefiltert von _MAX_ Einträgen)',
          sInfoPostFix: '',
          sInfoThousands: '.',
          sLengthMenu: '_MENU_ Einträge anzeigen',
          sLoadingRecords: 'Wird geladen ..',
          sProcessing: 'Bitte warten ..',
          sSearch: 'Suchen',
          sZeroRecords: 'Keine Einträge vorhanden',
          oPaginate: {
            sFirst: 'Erste',
            sPrevious: 'Zurück',
            sNext: 'Nächste',
            sLast: 'Letzte'
          },
          oAria: {
            sSortAscending: ': aktivieren, um Spalte aufsteigend zu sortieren',
            sSortDescending: ': aktivieren, um Spalte absteigend zu sortieren'
          },
          select: {
            rows: {
              _: '%d Zeilen ausgewählt',
              '0': '',
              '1': '1 Zeile ausgewählt'
            }
          },
          buttons: {
            print: 'Drucken',
            colvis: 'Spalten',
            copy: 'Kopieren',
            copyTitle: 'In Zwischenablage kopieren',
            copyKeys:
              'Taste <i>ctrl</i> oder <i>\u2318</i> + <i>C</i> um Tabelle<br>in Zwischenspeicher zu kopieren.<br><br>Um abzubrechen die Nachricht anklicken oder Escape drücken.',
            copySuccess: {
              _: '%d Zeilen kopiert',
              '1': '1 Zeile kopiert'
            },
            pageLength: {
              '-1': 'Zeige alle Zeilen',
              _: 'Zeige %d Zeilen'
            }
          }
        },
        drawCallback: () => {
          // HIER FÜR GBL
          // WENN STATION HIER KLICKT SOLL EINE ANFRAGE AN GBL GEHEN

          // eslint-disable-next-line func-names
          $('.delete').click(function() {
            const deleteid = $(this).data('deleteid');
            if (status === 'gbl' || status === 'admin') {
              const tdArray = [];
              $(this)
                .parents('tr')
                .find('td')
                // eslint-disable-next-line func-names
                .each(function() {
                  tdArray.push($(this).html());
                });
              tdArray.splice(-1, 1);
              const deleteMsg = `Datum: ${tdArray[0]}<br>
            Name: ${tdArray[1]}<br>Beginn: ${tdArray[2]}<br>
            Ende: ${tdArray[3]}<br>
            Arbeitszeit: ${tdArray[4]}<br>
            Gehalt: ${tdArray[5]}€<br>
            Eingetragen von: ${tdArray[6]}<br>
            Eingetragen am: ${tdArray[7]}<br>`;
              $('#deleteMsg').html(deleteMsg);
              $('#deleteModal').modal();
              $('#deleteConfirm').click(() => {
                $.ajax({
                  url: '../api/zdelete.php',
                  method: 'POST',
                  data: { id: deleteid, mode: 1 }
                })
                  .done(() => {
                    window.location.reload();
                  })
                  .fail(data => {
                    fehler(data.responseText);
                  });
              });
            } else {
              $.ajax({
                url: '../api/zreqdelete.php',
                method: 'POST',
                data: { id: deleteid }
              })
                .done(() => {
                  info('Regionalleiter wurde benachrichtigt');
                })
                .fail(data => {
                  fehler(data.responseText);
                });
            }
          });
        }
      });
      $('#min, #max').keyup(() => {
        if (
          moment($('#min').val(), 'YYYY-MM-DD').isValid() === true ||
          moment($('#max').val(), 'YYYY-MM-DD').isValid() === true
        )
          datatable.draw();
      });
    });
  })
  .fail(daten => {
    fehler(daten.responseText);
  });

$(document).ready(() => {
  $('nav li').removeClass('current');
  $('#zeiten').addClass('current');
});
