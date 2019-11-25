<?php
require '../scripts/session.php';
require '../scripts/connect.php';

// Eintragen in Tabelle zeiten
$sql = "INSERT INTO zeiten (name, ahid, datum, beginn, ende, arbeitszeit, gehalt, disponent, station, ahstation) 
  VALUES (:name, :ahid, :datum, :beginn, :ende, :arbeitszeit, :sgehalt, :disp, :station, :ahstation)";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $_POST['ausName']);
$stmt->bindValue(':ahid', $_POST['aushilfenId']);
$stmt->bindValue(':datum', $_POST['datum']);
$stmt->bindValue(':beginn', $_POST['beginnForm']);
$stmt->bindValue(':ende', $_POST['endeForm']);
$stmt->bindValue(':arbeitszeit', $_POST['diff']); // Arbeitszeit in Minuten
$stmt->bindValue(':sgehalt', $_POST['gehalt']); // Gehalt ungerundet, da teilweise falsch gerundet wird
$stmt->bindValue(':disp', $_SESSION['userid']);
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->bindValue(':ahstation', $_POST['ahStation']);

$stmt->execute();

if ($stmt->rowCount() < 1) {
  echo "Fehler!";
} else {
  echo "Eintrag erfolgreich";
}

$conn = null;
