<?php
require "../req/session.php";
$titel = "Arbeitszeitnachweis";
include "../req/header.php";
?>

<script>
  $('nav li').removeClass('current');
  $('#auswerten').addClass('current');
</script>

<div class="flex-wrapper">
  <div class="noPrint">
    <form method="post" class="container-tabelle-control" id="eaform" autocomplete="off">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" class="form-control" placeholder="Name" name="name" id="auswertenAuto" required>
      </div>
      <div class="form-group">
        <label for="monat">Zeitraum:</label>
        <input type="month" class="form-control" name="monat" id="datum"> 
      </div>
        <input type="submit" class="btn scc" value="OK">
    </form>
</div>
  <div class="container-tabelle-display" id="eaText"></div>
</div>

</main>
</body>
</html>

