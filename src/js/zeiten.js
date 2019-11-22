import 'datatables.net';
import 'datatables.net-bs4';

import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

import { roundTF, zuStunden, fehler } from './funktionen';

const moment = require('moment');

moment.locale('de');

// für filter -> ajax in api (bzw noch zeitenget) -> dann noch mal .DataTable(); ??

// sortieren der datatable nach datum geht nicht

// plug-ins/1.10.16/sorting/datetime-moment.js
// https://datatables.net/blog/2014-12-18

$.getJSON('zeitenget.php')
  .done(data => {
    const zeiten = [];

    data.forEach(element => {
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
        `<th><img src="../img/times-circle-regular.svg" width="18" class="delete" data-deletename="" data-deleteid="${element.id}"></th>`
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
        }
      });
    });
  })
  .fail(data => {
    fehler(data.responseText);
  });

$(document).ready(() => {
  $('nav li').removeClass('current');
  $('#zeiten').addClass('current');
});
