<?php
require '../req/expire.php';
require '../req/connect.php';

$sname = $_POST['sname'];
$sid = $_POST['sid'];
$sdatum = $_POST['sdatum'];
$sbeginn = $_POST['sbeginn'];
$sende = $_POST['sende'];
$saz = $_POST['saz'];
$sgehalt = $_POST['sgehalt'];
$skennung = $_POST['skennung'];
$station = $_SESSION['station'];

// Check ob Personalkennung existiert
$sql = "SELECT id FROM disponenten WHERE kennung = :skennung";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':skennung', $skennung);

$stmt->execute();

$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result === false) {
    die("<h5>Ungültige Personalkennung</h5>");
}

$disp = $result['id'];

// Eintragen in Tabelle zeiten
$sql = "INSERT INTO zeiten (name, ahid, datum, beginn, ende, arbeitszeit, gehalt, disponent, station) VALUES (:sname, :sid, :sdatum, :beginn, :ende, :saz, :sgehalt, :disp, :station)";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':sname', $sname);
$stmt->bindValue(':sid', $sid);
$stmt->bindValue(':sdatum', $sdatum);
$stmt->bindValue(':beginn', $sbeginn);
$stmt->bindValue(':ende', $sende);
$stmt->bindValue(':saz', $saz); // Arbeitszeit in Minuten
$stmt->bindValue(':sgehalt', $sgehalt); // Gehalt ungerundet, da teilweise falsch gerundet wird
$stmt->bindValue(':disp', $disp);
$stmt->bindValue(':station', $station);

$stmt->execute();

$conn = null;

# todo if $stmt->rowCount() > 1 dann: sonst bla
echo "Eintrag erfolgreich!";
