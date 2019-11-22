import 'datatables.net';
import 'datatables.net-bs4';

import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

import { roundTF, zuStunden, fehler } from './funktionen';

const moment = require('moment');

moment.locale('de');

// dies ist ein test

// für filter -> ajax in api (bzw noch zeitenget) -> dann noch mal .DataTable(); ??

// sortieren der datatable nach datum geht nicht

// plug-ins/1.10.16/sorting/datetime-moment.js
// https://datatables.net/blog/2014-12-18

$.getJSON('zeitenget.php')
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
          url: './dataTables.german.json'
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
                url: 'zdelete.php',
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
