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

  // eslint-disable-next-line func-names
  $('.stationSelect').change(function() {
    const newStation = $(this).val();
    $.ajax({
      method: 'post',
      url: '../api/admin.php',
      data: { newStation }
    })
      .done(() => {
        window.location.reload();
      })
      .fail(data => {
        // eslint-disable-next-line no-console
        console.log(data);
      });
  });
});
