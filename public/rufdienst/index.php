<?php
$titel = "Rufdienst";
include '../req/header.php';
?>

<div class="container-single">
  <form id="ndform" autocomplete="off">
    <div class="form-group">
      <label for="name">Aushilfe:</label>
      <input type="text" class="form-control" placeholder="Name" name="name" id="notdienstAuto">
    </div>
    <div class="form-group">
      <label for="date">Datum:</label>
      <input type="date" class="form-control" placeholder="dd-mm-yyyy" name="date" id="datum" required>
    </div>
    <div class="form-group">
      <label for="menge">Einsätze:</label>
      <input type="number" class="form-control" placeholder="Anzahl" name="menge" value="1" min="1">
    </div>
    <input type="submit" class="btn scc" value="OK">
  </form>
</div>

</main>
</body>
</html>
