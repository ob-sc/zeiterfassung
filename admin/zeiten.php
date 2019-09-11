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
                    <option value="">Alle</option>
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
<div class="container">
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
</div>
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
        zDaten = JSON.parse(data);
        zTabelle();
    })
    .fail(function(data) {
        alert('Fehler:\n' + JSON.stringify(data));
    })
})
function zTabelle() {
    let zRow = "";


    for (let v in zDaten) {
        zRow += '<tr><td>' + zDaten[v].name + '</td>';
        zRow += '<td>' + zDaten[v].datum + '</td>';
        zRow += '<td>' + zDaten[v].beginn + '</td>';
        zRow += '<td>' + zDaten[v].ende + '</td>';
        zRow += '<td>' + zDaten[v].arbeitszeit + '</td>';
        zRow += '<td>' + zDaten[v].gehalt + '</td>';
        zRow += '<td>' + zDaten[v].disponent + '</td>';
        zRow += '<td>' + zDaten[v].station + '</td></tr>';
    }
    
    
    $('#zTab').html(zRow);
}
</script>

<?php
include '../req/footer.php';
