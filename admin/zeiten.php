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
                    <option value="11">Hamburg Nedderfeld</option>
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
<div id="zeitentabelle"></div>
</div> <!-- Ende Wrapper -->

<script>
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
        $('#zeitentabelle').html(data);
    })
    .fail(function(data) {
        alert('Fehler:\n' + JSON.stringify(data));
    })
})
</script>

<?php
include '../req/footer.php';
