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
include "../req/header.php";
?>

<!-- Station auswählen -->
<div class="container col-2 float-left">
    <form action="index.php" method="post">
        <h5>Station ändern</h5>
        <p>Aktuelle Station: <span id="aktStation"></span></p>
        <select class="custom-select" name="stationSelect" id="stationSelect">
            <option value="70">Verwaltung</option>
            <option value="18">Osdorf</option>
            <option value="14">Billstedt</option>
        </select>
        <input type="submit" class="btn scc mt-3" name="stationSet" value="Ändern">
    </form>
</div>

<?php
if (isset($_POST['stationSet'])) {
    $_SESSION['station'] = $_POST['stationSelect'];
}
?>

<script>
$(document).ajaxComplete(function(){
    $('#aktStation').html(station);
});
</script>

<!-- Passwort ändern -->

<div class="container col-2 float-left">
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
        <input type="submit" name="aendern" class="btn scc m-1" value="Ändern">
    </form>
</div>

<?php
if (isset($_POST['aendern'])) {
    $benutzer = $_POST['username'];
    $passwort = $_POST['password'];
    $hash = password_hash($passwort, PASSWORD_DEFAULT);

    $sql = "UPDATE benutzer SET password = :passwort WHERE username = :benutzer";
    $stmt = $conn->prepare($sql);

    $stmt->bindValue(':passwort', $hash);
    $stmt->bindValue(':benutzer', $benutzer);

    $stmt->execute();

    if ($stmt->rowCount() == 0) {
        echo "<h3>Fehler</h3>";
    } else if ($stmt->rowCount() == 1) {
        echo "<h3>Geändert</h3>";
    }
}
?>

<!-- alle zeiten anzeigen (mit funktion filtern) -->

<?php
include "../req/footer.php";
?>
