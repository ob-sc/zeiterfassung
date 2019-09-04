<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="flex-wrapper">
    <span class="tabelle-links noPrint">
        <form method="post" id="eaform" autocomplete="off">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" placeholder="Name" name="name" id="nameInput" required>
            </div>
            <div class="form-group">
                <label for="monat">Zeitraum:</label>
                <input type="month" class="form-control" name="monat" id="datum"> 
            </div>
                <input type="submit" class="btn scc" value="OK">
        </form>
    </span>
    <span class="tabelle-rechts" id="eaText"></span>
</div>

<?php
include "../req/footer.php";
