import 'datatables.net';
import 'datatables.net-bs4';

import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

// lieber als fetch assoc holen und dann in js mit moment und bla in array packen

// datatables locale

$(document).ready(() => {
  $('nav li').removeClass('current');
  $('#zeiten').addClass('current');

  $.getJSON('zeitenget.php').done(data => {
    console.log(data);
    $('#example').DataTable({
      data
    });
  });
});
