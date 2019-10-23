<?php
require "../req/expire.php";
$titel = "Aushilfen";
include "../req/header.php";
?>

<div id="anlegenContainer">
  <form method="post" id="newForm" autocomplete="off">
    <div class="form-group">
      <label for="vorname">Vorname:</label>
      <input type="text" class="form-control" placeholder="Vorname" name="vorname" id="vorn" required>
      <label for="nachname">Nachname:</label>
      <input type="text" class="form-control" placeholder="Nachname" name="nachname" id="nachn" required>
    </div>
    <div class="form-group">
      <label for="name">Personalnummer:</label>
      <input type="number" class="form-control" placeholder="Personalnummer" name="personalnr">
    </div>
    <div class="form-group">
      <label for="status">Status:</label>
      <input type="number" class="form-control" placeholder="Status" value="450" name="status">
    </div>
    <div class="form-group">
      <label for="norlohn">Lohn Wochentag:</label>
      <input type="number" class="form-control" name="norlohn" id="anlegenNor" min="9.19" step="0.01" max="100" value="9.19">
      <label for="samlohn">Lohn Samstag:</label>
      <input type="number" class="form-control" name="samlohn" id="anlegenSam" min="9.19" step="0.01" max="100" value="10.00">
      <label for="sonlohn">Lohn Sonntag:</label>
      <input type="number" class="form-control" name="sonlohn" id="anlegenSon" min="9.19" step="0.01" max="100" value="11.00">
    </div>
    <input type="submit" class="btn scc mt-2" value="Anlegen">
    <input type="button" class="btn scc mt-2" value="Zurück" onclick="location.reload();">
  </form>
</div>

<div id="pnContainer">
  <form method="post" id="ahpnForm" autocomplete="off">
    <table class="table" style="width:100%;margin:auto;">
      <thead>
        <tr>
          <th width="50%">Name</th>
          <th width="50%">Personalnummer</th>
        </tr>
      </thead>
      <tbody id="ahpnTab">
      </tbody>
    </table>
    <input type="submit" class="btn scc mt-2" value="Ändern">
    <input type="button" class="btn scc mt-2" value="Zurück" onclick="location.reload();">
  </form>
</div>

<div class="container-fluid" id="bearbeitenContainer">
  <input type="button" class="btn scc mb-3" value="Neu anlegen" onclick="$('#anlegenContainer').show();$('#bearbeitenContainer').hide()">
  <input type="button" class="btn scc mb-3" value="Personalnummern" onclick="$('#pnContainer').show();$('#bearbeitenContainer').hide()">
  <table class="table table-hover table-sm" style="width:100%;margin:auto;">
    <thead>
      <tr>
        <th width="8%">PN</th>
        <th width="54%">Name</th>
        <th width="12%">Lohn Wochentag</th>
        <th width="12%">Lohn Samstag</th>
        <th width="12%">Lohn Sonntag</th>
        <th width="2%">&nbsp</th>
      </tr>
    </thead>
    <tbody id="ahTab">
    </tbody>
  </table>
</div>

<?php
include "../req/footer.php";
