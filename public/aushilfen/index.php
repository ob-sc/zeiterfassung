<?php
require "../req/session.php";
$titel = "Aushilfen";
include "../req/header.php";
?>

<script>
  $('nav li').removeClass('current');
  $('#aushilfen').addClass('current');
</script>

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
    <input type="submit" class="btn scc" value="Anlegen">
    <input type="button" class="btn scc" value="Zurück" onclick="location.reload();">
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

<div id="bearbeitenContainer">
  <input type="button" class="btn scc mb-3" value="Neu anlegen" onclick="$('#anlegenContainer').show();$('#bearbeitenContainer').hide()">
  <input type="button" class="btn scc mb-3" value="Personalnummern" onclick="$('#pnContainer').show();$('#bearbeitenContainer').hide()">
  <table class="table table-hover table-sm">
    <thead>
      <tr>
        <th width="6%">PN</th>
        <th width="60%" class="table-ltr">Name</th>
        <th width="8%">Wochentag</th>
        <th width="8%">Samstag</th>
        <th width="8%">Sonntag</th>
        <th width="5%">&nbsp</th>
        <th width="5%">&nbsp</th>
      </tr>
    </thead>
    <tbody id="ahTab">
    </tbody>
  </table>
</div>

<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div>
          Möchtest du <strong><span id="deleteName"></span></strong> wirklich löschen?
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" id="deleteConfirm">Ja</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Nein</button>
      </div>
    </div>
  </div>
</div>

</main>
</body>
</html>