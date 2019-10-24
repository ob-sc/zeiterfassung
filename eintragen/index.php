<?php
require "../req/session.php";
$titel = "Eintragen";
include "../req/header.php";
?>

<div class="flex-wrapper">
  <div class="eintragen-links">
    <form method="post" id="eform" autocomplete="off">
      <div class="form-group">
        <label for="name">Aushilfe:</label>
        <input type="text" class="form-control" placeholder="Name" name="stationName" id="nameInput">
        <input type="text" class="form-control" placeholder="Name" name="alleName" id="alleInput" style="display:none">
      </div>
      <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" id="stationCheck">
        <label class="form-check-label" for="stationCheck">Aus anderer Station</label>
      </div>
      <div class="form-group">
        <label for="date">Datum:</label>
        <input type="date" class="form-control" placeholder="dd-mm-yyyy" name="date" id="datum" required>
      </div>
      <div class="form-group" id="zeit">
        <label for="beginn">Beginn:</label>
        <input type="time" class="form-control" name="beginn" id="beginn" required>
        <label for="ende">Ende:</label>
        <input type="time" class="form-control" name="ende" id="ende" required>
      </div>
      <!-- todo <div class="form-check mb-3">
          <input type="checkbox" class="form-check-input" id="notdienst">
          <label class="form-check-label" for="notdienst">Notdienst</label>
      </div> -->
      <input type="submit" class="btn scc" value="OK">
    </form>
  </div>
  <div class="eintragen-rechts">
    <div id="etext"></div>
    <input type="button" id="esend" class="btn scc" value="Senden" style="display:none" onclick="senden();">
  </div>
</div>

<script src="eintragen.js"></script>

<?php
include "../req/footer.php";
