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

<!-- Station auswählen -->

<div class="admin-item">
    <form action="index.php" method="post">
        <h5>Station ändern</h5>
        <p>Aktuelle Station: <span id="aktStation"></span></p>
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
            <option value="30">Hannover Döhren</option>
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
        <input type="submit" class="btn scc mt-3" name="stationSet" value="Ändern">
    </form>
</div>

<!-- Passwort ändern -->

<div class="admin-item">
    <form action="index.php" method="post" autocomplete="off">
        <h5>Passwort ändern</h5>
        <div class="form-group">
            <label for="username">Benutzername:</label>
            <input type="text" class="form-control" placeholder="Benutzername" name="username" required>
        </div>
        <div class="form-group">
            <label for="password">Passwort:</label>
            <input type="text" class="form-control" placeholder="Passwort" name="password" required>
        </div>
        <input type="submit" name="pwAendern" class="btn scc" value="Ändern">
    </form>
</div>

<!-- Kennung ändern -->

<div class="admin-item">
    <form action="index.php" method="post" autocomplete="off">
        <h5>Kennung Disponent ändern</h5>
        <div class="form-group">
            <label for="disponent">Name Disponent:</label>
            <input type="text" class="form-control" placeholder="Name" name="disponent" required>
        </div>
        <div class="form-group">
            <label for="kennung">Kennung:</label>
            <input type="text" class="form-control" placeholder="Kennung" name="kennung" required>
        </div>
        <input type="submit" name="kAendern" class="btn scc" value="Ändern">
    </form>
</div>

<!-- Aushilfe PN ändern 

<div class="admin-item">
    <form action="index.php" method="post" autocomplete="off">
        <h5>PN Aushilfe ändern</h5>
        <div class="form-group">
            <label for="aushilfe">Name Aushilfe:</label>
            <input type="text" class="form-control" placeholder="Name" name="aushilfe" required>
        </div>
        <div class="form-group">
            <label for="pn">Personalnummer:</label>
            <input type="number" class="form-control" placeholder="Personalnummer" name="pn" required>
        </div>
        <input type="submit" name="pnAendern" class="btn scc" value="Ändern">
    </form>
</div>-->

<!-- Zeiten -->

<div class="admin-item">
    <form action="zeiten.php" method="post" autocomplete="off">
        <h5>Zeiten anzeigen</h5>
        <input type="submit" class="btn scc mt-5" value="OK">
    </form>
</div>

<!-- Flex Wrapper Ende -->
</div>

<script>
$(document).ajaxComplete(function(){
    $('#aktStation').html(station);
});
</script>
<?php
include '../req/footer.php';

if (isset($_POST['stationSet'])) {
    $_SESSION['station'] = $_POST['stationSelect'];
}
if (isset($_POST['pwAendern'])) {
    $benutzer = $_POST['username'];
    $passwort = $_POST['password'];
    $hash = password_hash($passwort, PASSWORD_DEFAULT);

    $sql = "UPDATE benutzer SET password = :passwort WHERE username = :benutzer";
    $stmt = $conn->prepare($sql);

    $stmt->bindValue(':passwort', $hash);
    $stmt->bindValue(':benutzer', $benutzer);

    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        echo "<script>alert('Fehler')</script>";
    } else if ($stmt->rowCount() == 1) {
        echo "<script>alert('Passwort geändert')</script>";
    }
}
if (isset($_POST['kAendern'])) {
    $disponent = $_POST['disponent'];
    $kennung = $_POST['kennung'];

    $sql = "UPDATE disponenten SET kennung = :kennung WHERE name = :disponent";
    $stmt = $conn->prepare($sql);

    $stmt->bindValue(':kennung', $kennung);
    $stmt->bindValue(':disponent', $disponent);

    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        echo "<script>alert('Fehler')</script>";
    } else if ($stmt->rowCount() == 1) {
        echo "<script>alert('Kennung geändert')</script>";
    }
}/*
if (isset($_POST['npAendern'])) {
    $aushilfe = $_POST['aushilfe'];
    $personalnr = $_POST['pn'];

    $sql = "UPDATE aushilfen SET personalnr = :personalnr WHERE name = :aushilfe";
    $stmt = $conn->prepare($sql);

    $stmt->bindValue(':personalnr', $personalnr);
    $stmt->bindValue(':aushilfe', $aushilfe);

    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        echo "<script>alert('Fehler')</script>";
    } else if ($stmt->rowCount() == 1) {
        echo "<script>alert('Personalnummer geändert')</script>";
    }
}*/
