<?php
require '../req/expire.php';
require '../req/connect.php';

$vorname = $_POST['vorname'];
$nachname = $_POST['nachname'];
$personalnr = $_POST['personalnr'];
$norlohn = $_POST['norlohn'];
$samlohn = $_POST['samlohn'];
$sonlohn = $_POST['sonlohn'];
$station = $_SESSION['station'];

$sql = "INSERT IGNORE INTO aushilfen (personalnr, vorname, nachname, norlohn, samlohn, sonlohn, station) VALUES (:personalnr, :vorname, :nachname, :norlohn, :samlohn, :sonlohn, :station)";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':personalnr', $personalnr);
$stmt->bindValue(':vorname', $vorname);
$stmt->bindValue(':nachname', $nachname);
$stmt->bindValue(':norlohn', $norlohn);
$stmt->bindValue(':samlohn', $samlohn);
$stmt->bindValue(':sonlohn', $sonlohn);
$stmt->bindValue(':station', $station);

$stmt->execute();

if ($stmt->rowCount() < 1) {
    echo "Aushilfe / Personalnummer existiert bereits!";
} else {
    echo "Name: $vorname $nachname \nPersonalnr: $personalnr \nLohn Wochtentag: $norlohn \nLohn Samstag: $samlohn \nLohn Sonntag: $sonlohn \nStation: $station \neingetragen!";
}

$conn = null;
?>
