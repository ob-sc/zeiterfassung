<?php
if (isset($_POST['newStation'])) {
  session_start();
  $_SESSION['station'] = $_POST['newStation'];
  exit($_SESSION['station']);
}
?>

<div>
  <select class="form-control" name="stationSelect" id="stationSelect">
    <option value="70">Verwaltung</option>
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
