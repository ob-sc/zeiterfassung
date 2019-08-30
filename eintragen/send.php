<?php
require '../req/expire.php';
require '../req/connect.php';

$sname = $_POST['sname'];
$sdatum = $_POST['sdatum'];
$sbeginn = $_POST['sbeginn'];
$sende = $_POST['sende'];
$saz = $_POST['saz'];
$sgehalt = $_POST['sgehalt'];
$skennung = $_POST['skennung'];
$station = $_SESSION['station'];

// Check ob Aushilfe existiert
$sql = "SELECT id, name , norlohn, samlohn, sonlohn FROM aushilfen WHERE name = :name";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $sname);

$stmt->execute();

$aushilfe = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($aushilfe === false) {
    die("<h4>Aushilfe nicht gefunden</h4>");
};

// Check ob Personalnr existiert
$sql = "SELECT id FROM disponenten WHERE kennung = :skennung";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':skennung', $skennung);

$stmt->execute();

$result = $stmt->fetch(PDO::FETCH_ASSOC);

if ($result === false) {
    die("<h4>Ungültige Personalkennung</h4>");
};

$disp = $result['id'];

// Eintragen in Tabelle zeiten
$sql = "INSERT INTO zeiten (name, datum, beginn, ende, arbeitszeit, gehalt, disponent, station) VALUES (:sname, :sdatum, :beginn, :ende, :saz, :sgehalt, :disp, :station)";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':sname', $sname);
$stmt->bindValue(':sdatum', $sdatum);
$stmt->bindValue(':beginn', $sbeginn);
$stmt->bindValue(':ende', $sende);
$stmt->bindValue(':saz', $saz); // Arbeitszeit in Minuten
$stmt->bindValue(':sgehalt', $sgehalt); // Gehalt ungerundet, da teilweise falsch gerundet wird
$stmt->bindValue(':disp', $disp);
$stmt->bindValue(':station', $station);

$stmt->execute();

$conn = null;

// TODO echo ändern -> kommt als data
echo "<h4>Eintrag erfolgreich!</h4>";

?>
