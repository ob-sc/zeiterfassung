<?php
require "../req/expire.php";
if ($_SESSION['status'] != 'admin') {
    die('<script>
            frage = window.prompt("Hat sich da jemand verlaufen?", "");
            if (frage == "ja" || frage == "Ja") {
                window.location.replace("http://maps.google.com")
            }
        </script>');
};
require '../req/connect.php';
include '../req/header.php';
?>

<div class="flex-wrapper">
    <form action="zeiten.php" method="post" id="filter">
        <div class="form-row">
            <div class="form-group col-2">
                <label for="beginn">Von:</label>
                <input type="date" class="form-control" name="beginn" id="beginn">
            </div>
            <div class="form-group col-2">
                <label for="ende">Bis:</label>
                <input type="date" class="form-control" name="ende" id="ende">
            </div>
            <div class="form-group col-3">
                <label for="aushilfe">Aushilfe:</label>
                <input type="text" class="form-control" name="aushilfe" id="nameInput">
            </div>
            <div class="form-group col-3">
                <label for="disponent">Disponent:</label>
                <input type="text" class="form-control" name="disponent" id="disponent">
            </div>
            <div class="form-group col-2">
                <label for="stationSelect">Station:</label>
                <select class="form-control" name="stationSelect" id="stationSelect">
                    <option value="70">Verwaltung</option>
                    <option value="10">Hamburg Jenfeld</option>
                    <option value="11">Hamburg Eppendorf</option>
                    <option value="12">Hamburg Eiffestraße</option>
                    <option value="13">Hamburg Heimfeld</option>
                    <option value="14">Hamburg Billstedt</option>
                    <option value="15">Hamburg Altona</option>
                    <option value="18">Hamburg Osdorf</option>
                    <option value="113">Harburg Mitte</option>
                    <option value="32">Bremen</option>
                    <option value="19">Hamburg Wandsbek</option>
                    <option value="114">Hamburg Langenhorn</option>
                    <option value="30">Hannover</option>
                    <option value="33">Hannover Döhren</option>
                    <option value="36">Braunschweig</option>
                    <option value="52">Düsseldorf</option>
                    <option value="20">Berlin Tiergarten</option>
                    <option value="21">Berlin Neukölln</option>
                    <option value="22">Berlin Pankow</option>
                    <option value="23">Berlin Rudow</option>
                    <option value="24">Berlin Spandau</option>
                    <option value="40">Köln Sülz</option>
                    <option value="45">Köln Ehrenfeld</option>
                    <option value="46">Köln Kalk</option>
                    <option value="47">Köln Dellbrück</option>
                    <option value="50">Essen</option>
                    <option value="54">Dortmund</option>
                    <option value="55">Frankfurt Ostend</option>
                    <option value="56">Frankfurt Griesheim</option>
                    <option value="57">Bad Homburg</option>
                    <option value="60">Kiel</option>
                    <option value="63">München</option>
                </select>
            </div>
        </div>
            <input type="submit" class="btn scc" name="ok" value="OK">
    </form>
<table class="table table-sm table-hover">
    <thead>
        <tr>
            <th>Name</th>
            <th>Datum</th>
            <th>Beginn</th>
            <th>Ende</th>
            <th>Arbeitszeit</th>
            <th>Gehalt</th>
            <th>Disponent</th>
            <th>Station</th>
        </tr>
    </thead>
    <tbody id="zTab">
    </tbody>
</table>
<div id="zeitentabelle"></div>
</div> <!-- Ende Wrapper -->

<script>
let zDaten;
$('#filter').submit(function(e){
    e.preventDefault();
    
    let von = $('#beginn').val();
    let bis = $('#ende').val();
    let aushilfe = $('#nameInput').val();
    let disponent = $('#disponent').val();
    let stationSelect = $('#stationSelect').val();

    $.ajax({
        url: 'adminget.php',
        method: 'POST',
        data: {
            von: von,
            bis: bis,
            aush: aushilfe,
            disp: disponent,
            stat: stationSelect
        }
    })
    .done(function(data) {
        zDaten = data;
        zTabelle();
    })
    .fail(function(data) {
        alert('Fehler:\n' + JSON.stringify(data));
    })
})
function zTabelle() {
    let zRow;

    console.log(zDaten);
    return;

    zRow += "<tr><td>"
    // Funktion normaler Eintrag
    function tagZeile(row) {
        gehaltEA = tage[row].gehalt;
        html += '<tr><td>' + plusNull(eintragsTag) + '.' + eaMonatJahr + '</td>';
        html += '<td>' + tage[row].beginn + '</td>';
        html += '<td>' + tage[row].ende + '</td>';
        html += '<td>' + moment.utc().startOf('day').add(tage[row].arbeitszeit, 'minutes').format('HH:mm') + '</td>';
        html += '<td>' + roundTF(gehaltEA) + '</td></tr>';
    }
    // Variable mit String für Tabelle
    // Loop für alle Abrechnungstage
    for (let i = 1; i <= monatsTage; i++) {
        let eintrag = false;
        // Loop für Objekt mit Tagen aus eaget.php
        for (let x in tage) {
            momentTag = moment(tage[x].datum, 'YYYY-MM-DD').format('D');
            // Normaler Eintrag
            if (eintragsTag == momentTag && eintragVorher != momentTag) {
                tagZeile(x);
                eintragVorher = momentTag;
                eintrag = true;
                delete tage[x];
                break;
            // Sondereintrag
            } else if (momentTag == eintragVorher) {
                eintrag = true;
                eintragsTag--;
                sonderZeile(x);
                delete tage[x];
                break;
            }
        }
        // Leerer Eintrag wenn davor nichts eingetragen wurde
        if (eintrag == false) {
            html += '<tr><td>' + plusNull(eintragsTag) + '.' + eaMonatJahr + '</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        }
        if (eintragsTag < monatsTage) {
            eintragsTag++;
        } else {
            eintragsTag = 1;
            eaMonatJahr = eaEnde;
        }
    }
    // Wiedergeben der Tabelle
    $('#eaText').html(html + '</tbody></table>');
    // Tabelle für Sondereinträge
    let sonderEintrag = '<h3 style="text-align:center;">Sondereinträge</h3>';
    sonderEintrag += '<table class="table table-bordered table-sm" style="width:100%;"><thead><tr>';
    sonderEintrag += '<th style="width:20%">Tag</th>';
    sonderEintrag += '<th style="width:20%">Beginn</th>';
    sonderEintrag += '<th style="width:20%">Ende</th>';
    sonderEintrag += '<th style="width:20%">Arbeitszeit</th>';
    sonderEintrag += '<th style="width:20%">Gehalt</th></tr></thead><tbody>';
    sonderEintrag += sonderRow;
    // Wenn die Tabelle Sondereinträge nicht leer ist -> diese wiedergeben
    if (sonderRow.length > 1) {
        $('#eaText').append(sonderEintrag + '</tbody></table>');
    }
    // Zusammenrechnung des Monats aus eaget.php
    $('#eaText').append('<strong>Arbeitszeit:</strong> ' + zuStunden(summe['arbeitszeit']));
    $('#eaText').append('<br><strong>Arbeitstage:</strong> ' + summe['datum']);
    let sumGehalt = summe['gehalt'];
    $('#eaText').append('<br><strong>Gehalt:</strong> ' + roundTF(sumGehalt) + '€');
    // wieviel bis maximales monatsgehalt / schon drüber
    let statusMax = parseInt(ahDaten[$('#nameInput').val()].ahStatus);
    let bisMax = statusMax - sumGehalt;
    if (sumGehalt <= 450) {
        $('#eaText').append('<br>Noch ' + roundTF(bisMax) + '€ bis ' + roundTF(statusMax) + '€<br>');
    } else if (sumGehalt > 450) {
        $('#eaText').append('<br><strong style="color:red;">Schon ' + roundTF(-bisMax) + '€ über ' + roundTF(statusMax) + '€</strong><br>');
    }
}
</script>

<?php
include '../req/footer.php';
