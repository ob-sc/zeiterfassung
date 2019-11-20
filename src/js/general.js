import { getData } from './funktionen';

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

// ADMIN / SL für Menü
getData(daten => {
  if (daten.status === 'admin') $('#adminmenu, .slmenu').show();
  if (daten.status === 'sl') $('.slmenu').show();
});
