<?php
require '../scripts/connect.php';

$result = [];

$monatsgehaltSQL = "SELECT sum(gehalt) AS gehalt FROM zeiten WHERE ahid = :id AND datum BETWEEN :ersterTagZeitraum AND CURDATE()";

$stmt = $conn->prepare($monatsgehaltSQL);

$stmt->bindValue(':id', $_POST['id']);
$stmt->bindValue(':ersterTagZeitraum', $_POST['ersterTagZeitraum']);

$stmt->execute();

$sqlres = $stmt->fetch(PDO::FETCH_ASSOC);
$result['monat'] = $sqlres['gehalt'];
if (is_null($sqlres['gehalt'])) $result['monat'] = 0;

$jahresgehaltSQL = 
"SELECT sum(gehalt) AS gehalt FROM zeiten WHERE ahid = :id AND datum BETWEEN :beginnDate AND :endDate";

$stmt = $conn->prepare($jahresgehaltSQL);

$stmt->bindValue(':id', $_POST['id']);
$stmt->bindValue(':beginnDate', $_POST['ersterTag']);
$stmt->bindValue(':endDate', $_POST['letzterTag']);

$stmt->execute();

$sqlres = $stmt->fetch(PDO::FETCH_ASSOC);
$result['jahr'] = $sqlres['gehalt'];

echo json_encode($result);

$conn = null;
