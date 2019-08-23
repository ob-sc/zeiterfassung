<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="container-fluid row no-gutters">
    <div class="container col-lg-3 col-6 noPrint" style="margin:0">
        <form action="" method="post" id="aform" autocomplete="off">
            <div class="form-group ">
                <label for="monat" class="m-1">Zeitraum:</label>
                <!-- kein support für safari und firefox! 
                https://caniuse.com/#feat=input-datetime-->
                <input type="month" class="form-control m-1 col-md-6" name="monat" id="datum"> 
            </div>
            <input type="submit" class="btn scc" value="OK">
        </form>
    </div>
    <div class="container col-lg-9 col-6" id="atext"></div>
</div>

<script>
let daten;
$('#aform').submit(function(e) {
    e.preventDefault();
    // $('#esend').show(); Druckbutton? wie eintragen
    $.ajax({
        url: 'abget.php',
        type: 'POST',
        dataType: 'json',
        data : $("#aform").serialize(),
    })
    .done(function(data) {
        daten = data;
        console.log(daten);
        tabelle();
    })
});

function tabelle() {
    let html = '<table class="table table-bordered" style="width:100%">\n';
    html += '<thead>\n';
    html += '<tr>\n';
    html += '<th scope="col">PN</th>\n';
    html += '<th scope="col">Name</th>\n';
    html += '<th scope="col">Arbeitszeit</th>\n';
    html += '<th scope="col">Gehalt</th>\n';
    html += '<th scope="col">Tage</th>\n';
    html += '</tr>\n';
    html += '</thead>\n';
    html += '<tbody>';
    for (let x in daten) {
        let gehalt = daten[x].gehalt;
        if (daten[x].gehalt > 450) {
            html += '<tr class="table-danger">';
        } else {
            html += '<tr>';
        }
        html += '<th scope="row">' + daten[x].personalnr + '</th>';
        html += '<td>' + daten[x].name + '</td>';
        html += '<td>' + daten[x].arbeitszeit + '</td>';
        html += '<td>' + gehalt.toFixed(2) + '</td>';
        html += '<td>' + daten[x].tage + '</td>';
        html += '</tr>';
    }
    $('#atext').html(html + '</tbody>\n</table>');
}
</script>

<?php
include "../req/footer.php";
?>
