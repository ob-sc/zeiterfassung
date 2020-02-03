<?php
require '../scripts/connect.php';

$result = [];

$monatsgehaltSQL = "SELECT sum(gehalt) AS gehalt FROM zeiten WHERE ahid = :id AND datum BETWEEN :ersterTagZeitraum AND CURDATE()";

$stmt = $conn->prepare($monatsgehaltSQL);

$stmt->bindValue(':id', $_POST['id']);
$stmt->bindValue(':ersterTagZeitraum', $_POST['ersterTagZeitraum']);

$stmt->execute();

$sqlres1 = $stmt->fetch(PDO::FETCH_ASSOC);
$result['monat'] = $sqlres1['gehalt'];
if (is_null($sqlres1['gehalt'])) $result['monat'] = 0;

$jahresgehaltSQL = 
"SELECT sum(gehalt) AS gehalt FROM zeiten WHERE ahid = :id AND datum BETWEEN :beginnDate AND :endDate";

$stmt = $conn->prepare($jahresgehaltSQL);

$stmt->bindValue(':id', $_POST['id']);
$stmt->bindValue(':beginnDate', $_POST['ersterTag']);
$stmt->bindValue(':endDate', $_POST['letzterTag']);

$stmt->execute();

$sqlres2 = $stmt->fetch(PDO::FETCH_ASSOC);
$result['jahr'] = $sqlres2['gehalt'];
if (is_null($sqlres2['gehalt'])) $result['jahr'] = 0;

echo json_encode($result);

$conn = null;
