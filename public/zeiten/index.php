<?php
$titel = "Zeiten";
include "../req/header.php";
?>

<div id="zeitenTable">
  <table id="zeitenDataTable" class="table table-sm table-hover table-bordered" style="width:100%">
    <thead>
      <tr>
        <th style="width:8%">Datum</th>
        <th style="width:25%">Name</th>
        <th style="width:8%">Beginn</th>
        <th style="width:8%">Ende</th>
        <th style="width:8%">AZ</th>
        <th style="width:8%">Gehalt</th>
        <th style="width:15%">Disponent</th>
        <th style="width:15%">Reg-Datum</th>
        <th style="width:5%">&nbsp</th>
      </tr>
    </thead>
    <tbody>
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
        <div id="deleteMsg"></div>
        <p><strong>Wirklich löschen?</strong></p>
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