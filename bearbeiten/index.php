<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="container-fluid row no-gutters">
    <div class="container col-6">
        <form action="aedit.php" method="post" class="form" autocomplete="off">
            <div class="form-group col-xl-6">
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input radio" name="optradio" value="anlegen" checked="checked">Aushilfe anlegen
                    </label>
                </div>
                <div class="form-check">
                    <label class="form-check-label">
                        <input type="radio" class="form-check-input radio" name="optradio" value="bearbeiten">Aushilfe bearbeiten
                    </label>
                </div>
            </div>
            <div class="form-group col-xl-6">
                <label for="name" class="m-1">Name:</label>
                <input type="text" class="form-control m-1 autocomplete" placeholder="Name" name="name" id="nameInput" required/>
            </div>
            <div class="form-group col-xl-6">
                <label for="nlohn" class="m-1">Lohn Normal:</label>
                <input type="number" name="nlohn" class="form-control m-1 lohnInput" min="9.19" step="0.01" max="100" value="9.19">
            </div>
            <div class="form-group col-xl-6">
                <label for="salohn" class="m-1">Lohn Samstag::</label>
                <input type="number" name="salohn" class="form-control m-1 lohnInput" min="9.19" step="0.01" max="100" value="10.00">
            </div>
            <div class="form-group col-xl-6">
                <label for="solohn" class="m-1">Lohn Sonntag:</label>
                <input type="number" name="solohn" class="form-control m-1 lohnInput" min="9.19" step="0.01" max="100" value="11.00">
            </div>
            <button type="submit" class="btn scc m-1">OK</button>
        </form>
    </div>
    <div class="container col-6" id="submitText"></div>
</div>

<script>
var xmlhttp = new XMLHttpRequest(), namen;
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        namen = JSON.parse(this.responseText);
        autocomplete(document.getElementById("nameInput"), namen);
    }
};
xmlhttp.open("GET", "../scripts/getname.php", true);
xmlhttp.send();
</script>

<?php
include "../req/footer.php";
?>
