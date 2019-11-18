<?php
require "../req/session.php";
$titel = "Mitarbeiter";
include '../req/header.php';
?>

<script>
  $('nav li').removeClass('current');
  $('#mitarbeiter').addClass('current');
</script>

<div id="maContainer" style="width:50%;margin:auto;border: 1px solid;">
  <table class="table table-hover table-sm">
    <thead>
      <tr>
        <th style="width:50%">Name</th>
        <th style="width:20%">Status</th>
        <th style="width:15%" class="text-center">Bestätigen</th>
        <th style="width:15%" class="text-center">Löschen</th>
      </tr>
    </thead>
    <tbody id="maTab">
    </tbody>
  </table>
</div>

</main>
</body>
</html>
