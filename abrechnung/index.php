<?php
require "../req/expire.php";
$titel = "Abrechnung";
include "../req/header.php";
?>

<div class="flex-wrapper">
    <div class="tabelle-links noPrint">
        <form method="post" id="aform" autocomplete="off">
            <div class="form-group">
                <label for="monat">Zeitraum:</label>
                <input type="month" class="form-control" name="monat" id="datum"> 
            </div>
            <input type="submit" class="btn scc" value="OK">
        </form>
    </div>
    <div class="tabelle-rechts" id="atext"></div>
</div>

<?php
include "../req/footer.php";
