<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="container-fluid row no-gutters">
    <div class="container col-xl-2 col-6 noPrint" style="margin:0">
        <form action="" method="post" id="aform" autocomplete="off">
            <div class="form-group ">
                <label for="monat" class="m-1">Zeitraum:</label>
                <!-- kein support für safari und firefox! 
                https://caniuse.com/#feat=input-datetime-->
                <input type="month" class="form-control m-1" name="monat" id="datum"> 
            </div>
            <input type="submit" class="btn scc" value="OK">
        </form>
    </div>
    <span class="container col-xl-10 col-6" id="atext"></span>
</div>

<script>
let abresult, daten, personalnr;
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
        abresult = data;
        personalnr = abresult.personalnr;
        daten = abresult.daten;
        console.log(abresult);
        console.log(personalnr);
        console.log(daten);
        tabelle();
    })
});

function tabelle() {
    // wo füge ich die namen und personalnr ein? wie kann ich alle namen aber nur die die gearbeitet haben eintragen in einer tabelle?
    $('#atext').html("<table style=\"width:100%\">");
    $('#atext').append("<tr>\n");
    $('#atext').append("<th>ID</th>\n");
    $('#atext').append("<th>Name</th>\n");
    $('#atext').append("<th>Arbeitszeit</th>\n");
    $('#atext').append("<th>Gehalt</th>\n");
    $('#atext').append("</tr>\n");
    for (let x in abresult.personalnr) {
        let abName = daten[x];
        let abAz = daten[x].arbeitszeit;
        let abGehalt = daten[x].gehalt;
        $('#atext').append("<tr>\n");
        $('#atext').append("<td>" + "id" + "</td>\n");
        $('#atext').append("<td>" + abName + "</td>\n");
        $('#atext').append("<td>" + abAz + "</td>\n");
        $('#atext').append("<td>" + abGehalt.toFixed(2) + "</td>\n");
        $('#atext').append("</tr>\n");
        $('#atext').append("</table>\n");
    }
}

</script>

<?php
include "../req/footer.php";
?>