<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="container-fluid row no-gutters">
    <span class="container col-6 noPrint">
        <form action="ecalc.php" method="post" class="form" autocomplete="off">
            <div class="form-group col-xl-6">
                <label for="name" class="m-1">Name:</label>
                <input type="text" class="form-control m-1 autocomplete" placeholder="Name" name="name" id="nameInput" required>
            </div>
            <!-- kein support für safari und firefox! 
            https://caniuse.com/#feat=input-datetime-->
            <div class="form-group col-xl-6">
                <label for="monat" class="m-1">Zeitraum:</label>
                <input type="month" class="form-control m-1" name="monat" id="monat"> 
                <script>document.getElementById('monat').valueAsDate = new Date();</script>
            </div>
            <div class="container">
                <input type="submit" class="btn scc" value="OK">
            </div>
        </form>
    </span>
    <span class="container col-6" id="submitText"></span>
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
