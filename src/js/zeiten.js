import dt from 'datatables.net';

$(document).ready(function() {
  $('nav li').removeClass('current');
  $('#zeiten').addClass('current');

  $('#example').DataTable();
});
