<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="container-fluid row no-gutters">
    <span class="container col-6 noPrint">
        <form action="" method="post" id="eaform" autocomplete="off">
            <div class="form-group col-xl-6">
                <label for="name" class="m-1">Name:</label>
                <input type="text" class="form-control m-1" placeholder="Name" name="name" id="nameInput" required>
            </div>
            <div class="form-group col-xl-6">
                <label for="monat" class="m-1">Zeitraum:</label>
                <input type="month" class="form-control m-1" name="monat" id="datum"> 
            </div>
                <input type="submit" class="btn scc" value="OK">
        </form>
    </span>
    <span class="container col-6" id="eaText"></span>
</div>

<script>
let eadaten;
$('#eaform').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: 'eaget.php',
        type: 'POST',
        dataType: 'json',
        data: $("#eaform").serialize(),
    })
    .done(function(data) {
        console.log(data);
    })
    .fail(function() {
        $('#eatext').html('<h3>Anfrage fehlgeschlagen</h3><br><h5>Bitte <a href="mailto:bergen@starcar.de">Ole Bergen</a> kontaktieren</h5>')
    })
});
</script>

<?php
include "../req/footer.php";
?>
