import dataJSON from './request';

$(document).ready(() => {
  // für jeden input Datum - automatisch Datum heute
  const datumInput = document.getElementById('datum');
  if (datumInput) datumInput.valueAsDate = new Date();
});

// devmode
$.getJSON('../scripts/getconfig.php').done(data => {
  const { settings } = data.daten;
  if (settings.devmode === '1') $('#devdiv').text('🦺');
});

$(document).ajaxComplete(() => {
  const userStatus = dataJSON.responseJSON.status;
  // ADMIN / SL für Menü
  if (userStatus === 'admin') $('#adminmenu, .slmenu').show();
  if (userStatus === 'sl') $('.slmenu').show();
});
