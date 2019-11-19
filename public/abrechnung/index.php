<?php
require "../req/session.php";
$titel = "Abrechnung";
include "../req/header.php";
?>

<script>
  $('nav li').removeClass('current');
  $('#abrechnung').addClass('current');
</script>

<div class="flex-wrapper">
  <div class="noPrint">
    <form method="post" class="container-tabelle-control" id="aform" autocomplete="off">
      <div class="form-group">
        <label for="monat">Zeitraum:</label>
        <input type="month" class="form-control" name="monat" id="datum"> 
      </div>
      <input type="submit" class="btn scc" value="OK">
    </form>
  </div>
  <div class="container-tabelle-display" id="atext"></div>
</div>
</main>
</body>
</html>
