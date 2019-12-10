<?php
session_start();
require '../scripts/connect.php';

// abrechnungszeitraum vorbereiten
$beginnDate = new DateTime($_POST['monat'].'-01');
$endDate = new DateTime($_POST['monat'].'-01');
$endDate->add(new DateInterval('P1M'));

$weSql = 
"SELECT id, datum, name, stunden, ausgleich
FROM wochenende
WHERE station = :station 
AND datum BETWEEN :von AND :bis 
ORDER BY datum ASC";

$stmt = $conn->prepare($weSql);

$stmt->bindValue(':von', $beginnDate->format('Y-m-d'));
$stmt->bindValue(':bis', $endDate->format('Y-m-d'));
$stmt->bindValue(':station', $_SESSION['station']);

$stmt->execute();

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

$conn = null;
