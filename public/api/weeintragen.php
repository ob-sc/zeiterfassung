<?php
require '../scripts/connect.php';

$weSql = 
"INSERT INTO wochenende (datum, name, stunden, ausgleich, station) VALUES (:datum, :name, :stunden, :ausgleich, :station)";

$stmt = $conn->prepare($weSql);

$stmt->bindValue(':datum', $_POST['date']);
$stmt->bindValue(':name', $_POST['name']);
$stmt->bindValue(':stunden', $_POST['stunden']);
$stmt->bindValue(':ausgleich', $_POST['verguetung']);
$stmt->bindValue(':station', $_SESSION['station']);

$stmt->execute();

if ($stmt->rowCount() < 1) {
  echo "Fehler!";
} else {
  echo "Eintrag erfolgreich";
}

$conn = null;
