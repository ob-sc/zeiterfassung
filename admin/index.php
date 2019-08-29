<?php
require "../req/expire.php";
include "../req/header.php";
#hier wenn status nicht admin -> raus
?>

<script>console.log(station) //warum undefined?!</script>

<div class="container col-2 float-left">
    <form action="index.php" method="post">
        <label for="stationSelect">Station:</label>
        <select class="custom-select" name="stationSelect">
            <option value="18">Osdorf</option>
            <option value="18">Billstedt</option>
        </select>
        <input type="submit" class="btn scc mt-3" name="stationSet" value="Ändern">
    </form>
</div>

<?php
if (isset($_POST['submmit'])) {
    $_SESSION['station'] = $_POST['stationSelect'];
}
?>

<!-- passwort erstellen per hash.php -->

<!-- alle zeiten anzeigen (mit funktion filtern) -->

<?php
include "../req/footer.php";
?>
