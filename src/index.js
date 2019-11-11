require('./jquery.auto-complete');
require('./eintragen');
require('./auswerten');
require('./abrechnung');
require('./aushilfen');
require('./mitarbeiter');

let userStatus;

$.get('../scripts/getconfig.php', data => {
  const config = JSON.parse(data);
  const { settings } = config.daten;
  // eslint-disable-next-line no-console
  if (settings.devmode === '1') console.log('dev');
});

$.get('../scripts/getdata.php', data => {
  const result = JSON.parse(data);
  userStatus = result.status;
});

$(document).ready(() => {
  // NACH DRUCKEN
  window.onafterprint = () => {
    $('.tabelle-rechts').css('width', '70%');
  };

  // für jeden input Datum - automatisch Datum heute
  const datumInput = document.getElementById('datum');
  if (datumInput) datumInput.valueAsDate = new Date();
});

$(document).ajaxComplete(() => {
  // ADMIN / SL für Menü
  if (userStatus === 'admin') $('#adminmenu, .slmenu').show();
  if (userStatus === 'sl') $('.slmenu').show();
});
