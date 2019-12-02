<?php
require '../scripts/connect.php';

// Zeitraum für durchschnitt -> anfang des jahres bis ende
$firstDay = new DateTime('first day of january ' . date('Y'));
$lastDay = new DateTime('last day of december ' . date('Y'));

$aushilfenSql = 
"SELECT sum(gehalt) AS gehalt FROM zeiten WHERE ahid = :id AND datum BETWEEN :beginnDate AND :endDate";

$stmt = $conn->prepare($aushilfenSql);

$stmt->bindValue(':id', $_POST['id']);
$stmt->bindValue(':beginnDate', $firstDay->format('Y-m-d'));
$stmt->bindValue(':endDate', $lastDay->format('Y-m-d'));

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

$conn = null;
