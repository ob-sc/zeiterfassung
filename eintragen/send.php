<?php
require '../req/session.php';
require '../req/connect.php';

// Eintragen in Tabelle zeiten
$sql = "INSERT INTO zeiten (name, ahid, datum, beginn, ende, arbeitszeit, gehalt, disponent, station, ahstation) VALUES (:sname, :sid, :sdatum, :beginn, :ende, :saz, :sgehalt, :disp, :station, :ahstation)";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':sname', $_POST['sname']);
$stmt->bindValue(':sid', $_POST['sid']);
$stmt->bindValue(':sdatum', $_POST['sdatum']);
$stmt->bindValue(':beginn', $_POST['sbeginn']);
$stmt->bindValue(':ende', $_POST['sende']);
$stmt->bindValue(':saz', $_POST['saz']); // Arbeitszeit in Minuten
$stmt->bindValue(':sgehalt', $_POST['sgehalt']); // Gehalt ungerundet, da teilweise falsch gerundet wird
$stmt->bindValue(':disp', $_SESSION['userid']);
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->bindValue(':ahstation', $_POST['sahstation']);

$stmt->execute();

if ($stmt->rowCount() < 1) {
  echo "Fehler!";
} else {
  echo "Eintrag erfolgreich";
}

$conn = null;
