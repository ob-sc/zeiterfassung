<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="flex-wrapper">
    <div class="container-links">
        <form method="post" id="eform" autocomplete="off">
            <div class="form-group">
                <label for="name" class="m-1">Aushilfe:</label>
                <input type="text" class="form-control m-1" placeholder="Name" name="name" id="nameInput" required>
            </div>
            <div class="form-group">
                <label for="date">Datum:</label>
                <input type="date" class="form-control m-1" placeholder="dd-mm-yyyy" name="date" id="datum" required>
            </div>
            <div class="form-group">
                <label for="beginn">Beginn:</label>
                <input type="time" class="form-control m-1" name="beginn" id="beginn" required>
                <label for="ende">Ende:</label>
                <input type="time" class="form-control m-1" name="ende" id="ende" required>
            </div>
            <div class="form-group">
                <label for="kennung">Kennung:</label>
                <input type="password" class="form-control m-1" placeholder="Kennung" name="kennung" id="kennung" required>
            </div>
            <div class="container">
                <input type="submit" class="btn scc" value="OK">
            </div>
        </form>
    </div>
    <div class="container-rechts">
        <div id="etext"></div>
        <input type="button" id="esend" class="btn scc m-1" value="Senden" style="display:none" onclick="senden();">
    </div>

</div>

<?php
include "../req/footer.php";
?>
