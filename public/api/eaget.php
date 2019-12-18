<?php
session_start();
require '../scripts/connect.php';

// abrechnungszeitraum vorbereiten
$beginnDate = new DateTime($_POST['datum'].'-17');
$beginnDate->sub(new DateInterval('P1M'));
$endDate = new DateTime($_POST['datum'].'-16');

#10.juli bis 9. august ist august

// QUERY 1 mehrere Reihen
$zeitenSql = "SELECT datum, beginn, ende, arbeitszeit, gehalt, station, ahstation FROM zeiten WHERE ahid = :id AND ahstation = :station AND datum BETWEEN :beginnDate AND :endDate ORDER BY datum ASC, beginn ASC";

$stmt = $conn->prepare($zeitenSql);

$stmt->bindValue(':id', $_POST['id']);
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->bindValue(':beginnDate', $beginnDate->format('Y-m-d'));
$stmt->bindValue(':endDate', $endDate->format('Y-m-d'));

$stmt->execute();

$zeiten = $stmt->fetchAll(PDO::FETCH_ASSOC);

// QUERY 2 Zähl-Funktionen
$sumSql = "SELECT SUM(arbeitszeit) AS arbeitszeit, SUM(gehalt) AS gehalt, COUNT(DISTINCT datum) AS datum FROM zeiten WHERE ahid = :id AND ahstation = :station AND datum BETWEEN :beginnDate AND :endDate";

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
