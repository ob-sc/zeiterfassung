import { dataJSON, configJSON } from './request';

require('./eintragen');
require('./auswerten');
require('./abrechnung');
require('./aushilfen');
require('./mitarbeiter');

$(document).ready(() => {
  // für jeden input Datum - automatisch Datum heute
  const datumInput = document.getElementById('datum');
  if (datumInput) datumInput.valueAsDate = new Date();
});

$.getJSON('../scripts/getconfig.php').done(data => {
  const { settings } = data.daten;
  // eslint-disable-next-line no-console
  if (settings.devmode === '1') console.log('dev');
});

$(document).ajaxComplete(() => {
  const userStatus = dataJSON.responseJSON.status;
  // ADMIN / SL für Menü
  if (userStatus === 'admin') $('#adminmenu, .slmenu').show();
  if (userStatus === 'sl') $('.slmenu').show();
});
