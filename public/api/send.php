<?php
require '../scripts/connect.php';

// test ob schon zeit eingetragen 
$stmt = $conn->prepare("SELECT id FROM zeiten WHERE ahid = :ahid AND datum = :date");

$stmt->bindValue(':ahid', $_POST['ahid']);
$stmt->bindValue(':date', $_POST['date']);

$stmt->execute();

if ($stmt->rowCount() !== 0) {
  http_response_code(500);
  $conn = null;
  die('Für diesen Tag ('. $_POST[date] .') wurde schon eine Schicht eingetragen');
}

// Eintragen in Tabelle zeiten
$sql = "INSERT INTO zeiten (name, ahid, datum, beginn, ende, arbeitszeit, gehalt, disponent, station, ahstation) 
  VALUES (:name, :ahid, :datum, :beginn, :ende, :arbeitszeit, :gehalt, :disp, :station, :ahstation)";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $_POST['name']);
$stmt->bindValue(':ahid', $_POST['ahid']);
$stmt->bindValue(':datum', $_POST['date']);
$stmt->bindValue(':beginn', $_POST['start']);
$stmt->bindValue(':ende', $_POST['end']);
$stmt->bindValue(':arbeitszeit', $_POST['diff']);
$stmt->bindValue(':gehalt', $_POST['gehalt']);
$stmt->bindValue(':disp', $_SESSION['userid']);
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->bindValue(':ahstation', $_POST['ahstation']);

$stmt->execute();

if ($stmt->rowCount() !== 1) {
  http_response_code(500);
  echo 'Fehler';
} else {
  http_response_code(201);
  echo 'Eintrag erfolgreich';
}

$conn = null;
