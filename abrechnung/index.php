<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="container-fluid row no-gutters">
    <div class="container col-lg-3 col-6 noPrint">
        <form action="#" method="post" id="aform" autocomplete="off">
            <div class="form-group">
                <label for="monat" class="m-1">Zeitraum:</label>
                <input type="month" class="form-control m-1 col-md-6" name="monat" id="datum"> 
            </div>
            <input type="submit" class="btn scc" value="OK">
        </form>
    </div>
    <div class="container col-lg-9 col-6" id="atext"></div>
</div>

<?php
include "../req/footer.php";
?>
