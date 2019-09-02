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
        <select class="custom-select" name="stationSelect" id="stationSelect">
            <option value="70">Verwaltung</option>
            <option value="18">Osdorf</option>
            <option value="14">Billstedt</option>
            <option value="12">Eiffestraße</option>
        </select>
        <input type="submit" class="btn scc mt-3" name="stationSet" value="Ändern">
    </form>
</div>

<!-- Passwort ändern -->

<div class="admin-item">
    <form action="index.php" method="post" autocomplete="off">
        <h5>Passwort ändern</h5>
        <div class="form-group">
            <label for="username" class="m-1">Benutzername:</label>
            <input type="text" class="form-control m-1" placeholder="Benutzername" name="username" required>
        </div>
        <div class="form-group">
            <label for="password">Passwort:</label>
            <input type="text" class="form-control m-1" placeholder="Passwort" name="password" required>
        </div>
        <input type="submit" name="pwAendern" class="btn scc m-1" value="Ändern">
    </form>
</div>

<!-- Kennung ändern -->

<div class="admin-item">
    <form action="index.php" method="post" autocomplete="off">
        <h5>Kennung Disponent ändern</h5>
        <div class="form-group">
            <label for="disponent" class="m-1">Name Disponent:</label>
            <input type="text" class="form-control m-1" placeholder="Name" name="disponent" required>
        </div>
        <div class="form-group">
            <label for="kennung">Kennung:</label>
            <input type="text" class="form-control m-1" placeholder="Kennung" name="kennung" required>
        </div>
        <input type="submit" name="kAendern" class="btn scc m-1" value="Ändern">
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
}
?>