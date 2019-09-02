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
?>
<html lang="de">
<head>
    <title>Zeiterfassung Aushilfen</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/jquery.auto-complete.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="../js/moment.js"></script>
    <script src="../js/main.js"></script>
    <script src="../js/jquery.auto-complete.js"></script>
</head>
<body>

<!-- 
https://css-tricks.com/snippets/css/a-guide-to-flexbox/
https://css-tricks.com/snippets/css/sticky-footer/ 

komplett mit flexbox
flexbox in flexbox geht

classe wrapper auf body?
-->

<div class="wrapper">
<header>
    <div class="dropdown">
        <img src="../img/menu.svg" class="dropdown-toggle noPrint" width="30" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="btnDD">
        <div class="dropdown-menu dropdown-menu-right" aria-lab>
            <a class="dropdown-item" href="../eintragen/index.php">Eintragen</a>
            <a class="dropdown-item" href="../auswerten/index.php">Auswerten</a>
            <a class="dropdown-item priv" href="../abrechnung/index.php">Abrechnung</a>
            <a class="dropdown-item priv" href="../bearbeiten/index.php">Aushilfen</a>
            <a class="dropdown-item" href="../admin/index.php" id="admin" style="display:none">Admin</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="../scripts/logout.php">
                <img src="../img/logout.svg" width="16"> Abmelden
            </a>
        </div>
    </div>
    <div>
        <img src="../img/logo_starcar2x.png" alt="SC_Logo" width="276" height="53">
        <h1 style="font-weight:bolder">Zeiterfassung Aushilfen</h1>
    </div>
</header>
<main>

<!-- Station auswählen -->

    <div class="flex-item">
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

<!-- Passwort ändern -->

    <div class="flex-item">
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
        <input type="button" onclick="text();" value="text"><div id="text"></div><script>function text() {$('#text').html('asdasdasdasdfdgdfgghdfhasas<br>dasdasdasdfdgdfggh<br>dfhasdasdfdgd<br>fgghdfh<br>asdasdfdgdfgghdfhasd<br>asdfdgdfgghdfhasdasdf<br>dgdfg<br>ghdfhfdgdfgghdfhasd<br>asdasdasdfdgdfgghdfhasdasd<br>fdgdfgghdfhasdasd<br>fdgdfgghdfhasda<br>sdfdgdfgghdfhasdasdfdgdfgg<br>hdfhfdgdfgghdfh<br>asdasdasdasdfdgd<br>fgghdfhasdasdfdgdfgg<br>hdfhasdasdfdgdfgghdf<br>hasdasdfdgdfgghdf<br>hasdasdfdgdfgghdfhf<br>dgdfgghdfhasdasdasd<br>asdfdgdfgghdfhasdasdfdgdfgghdfha<br>sdasdfdgdfgghdfhasdasdfdgdfgghdfhasdasdf<br>dgdfgghdfhfdgdfgghdfhasdasda<br>sdasdfdgdfgghdfhasdasdf<br>dgdfgghdfhasdasdfdgdfgghdfhasdasdfdgd<br>fgghdfhasdasdfdgdfgghdfhfdgdfg<br>ghdfhasdasdasdasdfdgdfgghdfhas<br>dasdfdgdfgghdfhasdasdfdgdfgghdfhasdasdfdgdfgg<br>hdfhasdasdfdgdfgghdfhfdgdfgghdfhasdasdasda<br>sdfdgdfgghdfhasdasd<br>fdgdfgghdfhasdasdfdgdfgghd<br>fhasdasdfdgdfgghdfhasdasdfdgdfggh<br>dfhfdgdfgghdfhdasdfdgdfgghdfh<br>asdasdfdgdfgghdf<br>hasdasdfdgdfgghdfhasdasdfdg<br>dfgghdfhfdg<br>dfgghdfh');}</script>
    </div>

<!-- Kennung ändern -->

    <div class="flex-item">
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
</main>
<footer>
    <div>
        <a href="mailto:bergen@starcar.de">Kontakt</a>
    </div>
    <div>© 2019 STARCAR GmbH</div>
</footer>
</div>
</body>
</html>

<script>
$(document).ajaxComplete(function(){
    $('#aktStation').html(station);
});
</script>
<?php
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