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
let tage, summe;
$('#eaform').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: 'eaget.php',
        type: 'POST',
        dataType: 'json',
        data: $("#eaform").serialize(),
    })
    .done(function(data) {
        daten = data;
        tage = daten.tage;
        summe = daten.summe;
        console.log(daten);
        eatabelle();
    })
    .fail(function() {
        $('#eaText').html('<h3>Anfrage fehlgeschlagen</h3><br><h5>Bitte <a href="mailto:bergen@starcar.de">Ole Bergen</a> kontaktieren</h5>')
    })
});

function eatabelle() {
    let eintragVorher, gehaltEA, seVorhanden;
    let sonderRow = ' ';
    // Ende Funktion wenn keine Einträge
    if (tage.length == 0) {
        $('#eaText').html('<h3>Keine Einträge für diesen Monat</h3>');
        return;
    }
    // Tage im Monat
    let monatstage = moment($('#datum').val(), "YYYY-MM").daysInMonth();
    // Funktion normaler Eintrag
    function tagZeile(row) {
        gehaltEA = tage[row].gehalt;
        html += '<tr><th scope="row">' + momentTag + '</th>';
        html += '<td>' + tage[row].beginn + '</td>';
        html += '<td>' + tage[row].ende + '</td>';
        html += '<td>' + moment.utc().startOf('day').add(tage[row].arbeitszeit, 'minutes').format('HH:mm') + '</td>';
        html += '<td>' + gehaltEA.toFixed(2) + '</td></tr>';
    }
    // Funktion Sondereintrag bei mehrfachem Datum
    function sonderZeile(row) {
        gehaltEA = tage[row].gehalt
        sonderRow += '<tr><th scope="row">' + momentTag + '</th>';
        sonderRow += '<td>' + tage[row].beginn + '</td>';
        sonderRow += '<td>' + tage[row].ende + '</td>';
        sonderRow += '<td>' + moment.utc().startOf('day').add(tage[row].arbeitszeit, 'minutes').format('HH:mm') + '</td>';
        sonderRow += '<td>' + gehaltEA.toFixed(2) + '</td></tr>';
    }
    // Variable mit String für Tabelle
    let html = '<h3 style="text-align:center">Monatsübersicht ' + $('#nameInput').val() + ', ' + moment($('#datum').val(), 'YYYY-MM').format('MMMM YYYY') + '</h3>\n';
    html += '<table class="table table-bordered table-sm" style="width:100%"><thead><tr>';
    html += '<th style="width:20%" scope="col">Tag</th>';
    html += '<th style="width:20%" scope="col">Beginn</th>';
    html += '<th style="width:20%" scope="col">Ende</th>';
    html += '<th style="width:20%" scope="col">Arbeitszeit</th>';
    html += '<th style="width:20%" scope="col">Gehalt</th></tr></thead><tbody>';
    // Loop für alle Monatstage
    for (let i = 1; i <= monatstage; i++) {
        let eintrag = false;
        // Loop für Objekt mit Tagen aus eaget.php
        for (let x in tage) {
            momentTag = moment(tage[x].datum, 'YYYY-MM-DD').format('D');
            // console.log('x: ' + x + ', i: ' + i + ', momentTag: ' + momentTag + ', tage[x].datum: ' + tage[x].datum + ', eintragVorher: ' + eintragVorher); TODO nur test
            // Normaler Eintrag
            if (i == momentTag && eintragVorher != momentTag) {
                tagZeile(x);
                eintragVorher = momentTag;
                eintrag = true;
                delete tage[x];
                break;
            // Sondereintrag
            } else if (momentTag == eintragVorher) {
                seVorhanden = true;
                eintrag = true;
                sonderZeile(x);
                delete tage[x];
                break;
            }
        }
        // Leerer Eintrag wenn davor nichts eingetragen wurde
        if (eintrag == false) {
            html += '<tr><th scope="row">' + i + '</th><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        }
    }
    // Wiedergeben der Tabelle
    $('#eaText').html(html + '</tbody></table>');
    // Tabelle für Sondereinträge
    let sonderEintrag = '<h3 style="text-align:center;">Sondereinträge</h3>';
    sonderEintrag += '<table class="table table-bordered table-sm" style="width:100%;"><thead><tr>';
    sonderEintrag += '<th style="width:20%" scope="col">Tag</th>';
    sonderEintrag += '<th style="width:20%" scope="col">Beginn</th>';
    sonderEintrag += '<th style="width:20%" scope="col">Ende</th>';
    sonderEintrag += '<th style="width:20%" scope="col">Arbeitszeit</th>';
    sonderEintrag += '<th style="width:20%" scope="col">Gehalt</th></tr></thead><tbody>';
    sonderEintrag += sonderRow;
    // Wenn die Tabelle Sondereinträge nicht leer ist diese wiedergeben
    if (sonderRow.length > 1) {
        $('#eaText').append(sonderEintrag + '</tbody></table>');
    }
    // Zusammenrechnung des Monats aus eaget.php
    $('#eaText').append('<strong>Arbeitszeit:</strong> ' + moment.utc().startOf('day').add(summe['SUM(arbeitszeit)'], 'minutes').format('HH:mm'));
    let sumGehalt = summe['SUM(gehalt)'];
    $('#eaText').append('<br><strong>Gehalt:</strong> ' + sumGehalt.toFixed(2) + '€');
    $('#eaText').append('<br><strong>Arbeitstage:</strong> ' + summe['COUNT(DISTINCT datum)'] + '<br>');
    
    // Druckbutton
    $('#eaText').append('<input type="button" onclick="window.print();" value="Drucken" class="noPrint btn scc my-3">');
};
</script>

<?php
include "../req/footer.php";
?>
