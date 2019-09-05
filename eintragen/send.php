<?php
require '../req/expire.php';
require '../req/connect.php';

// Check ob Personalkennung existiert
$sql = "SELECT id FROM disponenten WHERE kennung = ?";
$stmt = $conn->prepare($sql);

$stmt->execute(array($_POST['skennung']));

$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result === false) {
    die("<strong>Ungültige Personalkennung!</strong>");
}

// Eintragen in Tabelle zeiten
$sql = "INSERT INTO zeiten (name, ahid, datum, beginn, ende, arbeitszeit, gehalt, disponent, station) VALUES (:sname, :sid, :sdatum, :beginn, :ende, :saz, :sgehalt, :disp, :station)";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':sname', $_POST['sname']);
$stmt->bindValue(':sid', $_POST['sid']);
$stmt->bindValue(':sdatum', $_POST['sdatum']);
$stmt->bindValue(':beginn', $_POST['sbeginn']);
$stmt->bindValue(':ende', $_POST['sende']);
$stmt->bindValue(':saz', $_POST['saz']); // Arbeitszeit in Minuten
$stmt->bindValue(':sgehalt', $_POST['sgehalt']); // Gehalt ungerundet, da teilweise falsch gerundet wird
$stmt->bindValue(':disp', $result['id']);
$stmt->bindValue(':station', $_SESSION['station']);

$stmt->execute();

if ($stmt->rowCount() < 1) {
    echo "<strong>Fehler!</strong>";
} else {
    echo "<strong>Eintrag erfolgreich</strong>";
}

$conn = null;
