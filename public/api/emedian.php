<?php
require '../scripts/connect.php';

$aushilfenSql = 
"SELECT sum(gehalt) AS gehalt FROM zeiten WHERE ahid = :id AND datum BETWEEN :beginnDate AND :endDate";

$stmt = $conn->prepare($aushilfenSql);

$stmt->bindValue(':id', $_POST['id']);
$stmt->bindValue(':beginnDate', $_POST['ersterTag']);
$stmt->bindValue(':endDate', $_POST['letzterTag']);

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

$conn = null;
