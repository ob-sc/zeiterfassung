<?php
require '../req/expire.php';
require '../req/connect.php';

// abrechnungszeitraum vorbereiten
$beginnDate = new DateTime($_POST['datum'].'-10');
$beginnDate->sub(new DateInterval('P1M'));
$endDate = new DateTime($_POST['datum'].'-09');

#10.juli bis 9. august ist august

// QUERY 1 mehrere Reihen
$zeitenSql = "SELECT datum, beginn, ende, arbeitszeit, gehalt FROM zeiten WHERE ahid = :id AND station = :station AND datum BETWEEN :beginnDate AND :endDate ORDER BY datum ASC, beginn ASC";

$stmt = $conn->prepare($zeitenSql);

$stmt->bindValue(':id', $_POST['id']);
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->bindValue(':beginnDate', $beginnDate->format('Y-m-d'));
$stmt->bindValue(':endDate', $endDate->format('Y-m-d'));
$stmt->execute();

$zeiten = $stmt->fetchAll(PDO::FETCH_ASSOC);

// QUERY 2 Zähl-Funktionen
// todo mit SUM(gehalt) as gehalt -> wichtig key in eatabelle ändern)
$sumSql = "SELECT SUM(arbeitszeit), SUM(gehalt), COUNT(DISTINCT datum) FROM zeiten WHERE ahid = :id AND station = :station AND datum BETWEEN :beginnDate AND :endDate";

$stmt = $conn->prepare($sumSql);

$stmt->bindValue(':id', $_POST['id']);
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->bindValue(':beginnDate', $beginnDate->format('Y-m-d'));
$stmt->bindValue(':endDate', $endDate->format('Y-m-d'));

$stmt->execute();

$summen = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'tage' => $zeiten,
    'summe' => $summen,
    'beginn' => $beginnDate->format('m.Y'),
    'ende' => $endDate->format('m.Y')
]);

$conn = null;
