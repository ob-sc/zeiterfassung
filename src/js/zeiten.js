import 'datatables.net';
import 'datatables.net-bs4';

import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

import { session, roundTF, zuStunden, fehler } from './funktionen';

const moment = require('moment');

moment.locale('de');

session();

// für filter -> ajax in api (bzw noch zeitenget) -> dann noch mal .DataTable(); ??

// sortieren der datatable nach datum geht nicht

// plug-ins/1.10.16/sorting/datetime-moment.js
// https://datatables.net/blog/2014-12-18

$.getJSON('../shitapi/zeitenget.php')
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
      $('#zeitenDataTable').DataTable({
        data: zeiten,
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
          // eslint-disable-next-line func-names
          $('.delete').click(function() {
            const deleteid = $(this).data('deleteid');

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
                url: '../shitapi/zdelete.php',
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
        }
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
