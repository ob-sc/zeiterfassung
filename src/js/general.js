import { getData } from './funktionen';

$.getJSON('../scripts/session.php').done(data => {
  if (data.code !== 3) {
    switch (data.code) {
      case 0:
        window.location.href = '../index.html#neu';
        break;
      case 1:
        window.location.href = '../index.html#expire';
        break;
      case 2:
        window.location.href = '../index.html#expire';
        break;
      default:
        // eslint-disable-next-line no-console
        console.log(data);
        break;
    }
  }

  $(document).ready(() => {
    if (data.userStatus === 'admin') $('#adminmenu, .slmenu').show();
    if (data.userStatus === 'sl') $('.slmenu').show();
  });
});

$(document).ready(() => {
  // für jeden input Datum - automatisch Datum heute
  const datumInput = document.getElementById('datum');
  if (datumInput) datumInput.valueAsDate = new Date();

  // devmode
  $.getJSON('../scripts/getconfig.php').done(configdata => {
    if (configdata.daten.settings.devmode === '1') $('#devdiv').text('🦺');
    // eslint-disable-next-line no-console
    if (configdata.status !== 'OK') console.log(configdata);
  });

  // adminmenü richtig setzen
  getData(menudaten => {
    $('#stationSelect').val(menudaten.stationid);
  });

  // eslint-disable-next-line func-names
  $('#stationSelect').change(function() {
    const newStation = $(this).val();
    $.ajax({
      method: 'post',
      url: '../admin/admin.php',
      data: { newStation }
    })
      .done(() => {
        window.location.reload();
      })
      .fail(admindata => {
        // eslint-disable-next-line no-console
        console.log(admindata);
      });
  });
});
