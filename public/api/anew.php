<?php
require '../scripts/connect.php';

$sql = "INSERT INTO aushilfen (personalnr, vorname, nachname, norlohn, samlohn, sonlohn, station, status) VALUES (:personalnr, :vorname, :nachname, :norlohn, :samlohn, :sonlohn, :station, :status)";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':personalnr', $_POST['personalnr']);
$stmt->bindValue(':vorname', $_POST['vorname']);
$stmt->bindValue(':nachname', $_POST['nachname']);
$stmt->bindValue(':norlohn', $_POST['norlohn']);
$stmt->bindValue(':samlohn', $_POST['samlohn']);
$stmt->bindValue(':sonlohn', $_POST['sonlohn']);
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->bindValue(':status', $_POST['statusMax']);

$stmt->execute();

if ($stmt->rowCount() < 1) {
  echo "Fehler!";
} else {
  echo "Aushilfe eingetragen!";
}

$conn = null;
