<?php
require "../req/session.php";
if ($_SESSION['status'] != 'admin') {
  die('<script>
        frage = window.prompt("Hat sich da jemand verlaufen?", "");
        if (frage == "ja" || frage == "Ja") {
          window.location.replace("http://maps.google.com")
        }
    </script>');
};
require '../req/connect.php';
$titel = "Zeiten";
include '../req/header.php';
?>

<div class="flex-wrapper">
  <form action="zeiten.php" method="post" id="filter">
    <div class="form-row">
      <div class="form-group col-2">
        <label for="beginn">Von:</label>
        <input type="date" class="form-control" name="beginn" id="beginn">
      </div>
      <script>
        $('#beginn').val(moment().startOf('year').format('YYYY-MM-DD'));
      </script>
      <div class="form-group col-2">
        <label for="ende">Bis:</label>
        <input type="date" class="form-control" name="ende" id="ende">
      </div>
      <script>
        $('#ende').val(moment().endOf('year').format('YYYY-MM-DD'));
      </script>
      <div class="form-group col-3">
        <label for="aushilfe">Aushilfe:</label>
        <input type="text" class="form-control" name="aushilfe" id="alleInput">
      </div>
      <div class="form-group col-3">
        <label for="disponent">Disponent:</label>
        <input type="text" class="form-control" name="disponent" id="zDisp">
      </div>
      <div class="form-group col-2">
        <label for="stationSelect">Station:</label>
        <select class="form-control" name="stationSelect" id="stationSelect">
          <option value="">Alle</option>
          <option value="10">Hamburg Jenfeld</option>
          <option value="11">Hamburg Eppendorf</option>
          <option value="12">Hamburg Eiffestraße</option>
          <option value="13">Hamburg Heimfeld</option>
          <option value="14">Hamburg Billstedt</option>
          <option value="15">Hamburg Altona</option>
          <option value="18">Hamburg Osdorf</option>
          <option value="113">Harburg Mitte</option>
          <option value="32">Bremen</option>
          <option value="19">Hamburg Wandsbek</option>
          <option value="114">Hamburg Langenhorn</option>
          <option value="30">Hannover</option>
          <option value="33">Hannover Döhren</option>
          <option value="36">Braunschweig</option>
          <option value="52">Düsseldorf</option>
          <option value="20">Berlin Tiergarten</option>
          <option value="21">Berlin Neukölln</option>
          <option value="22">Berlin Pankow</option>
          <option value="23">Berlin Rudow</option>
          <option value="24">Berlin Spandau</option>
          <option value="40">Köln Sülz</option>
          <option value="45">Köln Ehrenfeld</option>
          <option value="46">Köln Kalk</option>
          <option value="47">Köln Dellbrück</option>
          <option value="50">Essen</option>
          <option value="54">Dortmund</option>
          <option value="55">Frankfurt Ostend</option>
          <option value="56">Frankfurt Griesheim</option>
          <option value="57">Bad Homburg</option>
          <option value="60">Kiel</option>
          <option value="63">München</option>
        </select>
      </div>
    </div>
      <input type="submit" class="btn scc" name="ok" value="OK">
      <input type="button" class="btn scc" value="Reset" onclick="resetFilter();">
      <script>
      function resetFilter() {
        $('#filter')[0].reset();
        $('#beginn').val(moment().startOf('year').format('YYYY-MM-DD'));
        $('#ende').val(moment().endOf('year').format('YYYY-MM-DD'));
        $('#filter').submit();
      }
      </script>
  </form>
  <div class="container-fluid">
    <table class="table table-sm table-hover">
      <thead>
        <tr>
          <th>Datum</th>
          <th>ID</th>
          <th>Name</th>
          <th>Beginn</th>
          <th>Ende</th>
          <th>AZ</th>
          <th>Gehalt</th>
          <th>Disponent</th>
          <th>Station</th>
          <th>Reg-Datum</th>
        </tr>
      </thead>
      <tbody id="zTab">
      </tbody>
    </table>
  </div>
</div>

<script>
let zDaten, zDisp;
$('#filter').submit(function(e){
  e.preventDefault();
  
  let von = $('#beginn').val();
  let bis = $('#ende').val();
  let aushilfe = $('#alleInput').val();
  let disponent = $('#zDisp').val();
  let stationSelect = $('#stationSelect').val();

  $.ajax({
    url: 'adminget.php',
    method: 'POST',
    data: {
      von: von,
      bis: bis,
      aush: aushilfe,
      disp: disponent,
      stat: stationSelect
    }
  })
  .done(function(data) {
    let result = JSON.parse(data);
    zDaten = result.zeiten;
    zDisp = result.disponenten;
    console.log(result);
    zTabelle();
  })
  .fail(function(data) {
    alert('Fehler:\n' + JSON.stringify(data));
  })
})
function zTabelle() {
  let zRow = "";

  for (let v in zDaten) {
    let zGehalt = zDaten[v].gehalt;
    let zAZ = zDaten[v].arbeitszeit;

    zRow += '<tr><td>' + moment(zDaten[v].datum).format('DD.MM.YYYY') + '</td>';
    zRow += '<td>' + zDaten[v].id + '</td>';
    zRow += '<td>' + zDaten[v].name + '</td>';
    zRow += '<td>' + zDaten[v].beginn + '</td>';
    zRow += '<td>' + zDaten[v].ende + '</td>';
    zRow += '<td>' + zuStunden(zAZ) + '</td>';
    zRow += '<td>' + roundTF(zGehalt) + '</td>';
    zRow += '<td>' + zDaten[v].username + '</td>';
    zRow += '<td>' + zDaten[v].statname + '</td>';
    zRow += '<td>' + moment(zDaten[v].reg_date).format('DD.MM.YYYY HH:mm') + '</td></tr>';
  }
  
  $('#zTab').html(zRow);
}
$('#zDisp').autoComplete({
  minChars: 1,
  delay: 0,
  source: function(term, suggest){
    term = term.toLowerCase();
    var matches = [];
    for (i=0; i<zDisp.length; i++)
      if (~zDisp[i].toLowerCase().indexOf(term)) matches.push(zDisp[i]);
    suggest(matches);
  }
})
$(document).ready(function() {
  $('#filter').submit();
})
</script>