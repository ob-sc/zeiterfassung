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
});

$(document).ajaxComplete(() => {
  // ADMIN / SL für Menü
  if (userStatus === 'admin') $('#adminmenu, .slmenu').show();
  if (userStatus === 'sl') $('.slmenu').show();
});
