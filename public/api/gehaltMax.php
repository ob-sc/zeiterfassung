<?php
require '../scripts/connect.php';

$result = [];

$monthSQL = "SELECT sum(gehalt) AS gehalt FROM zeiten WHERE ahid = :id AND datum BETWEEN :fdm AND CURDATE()";

$stmt = $conn->prepare($monthSQL);

$stmt->bindValue(':id', $_POST['ahid']);
$stmt->bindValue(':fdm', $_POST['firstDayMonth']); 

$stmt->execute();

$mResult = $stmt->fetch(PDO::FETCH_ASSOC);
$result['month'] = $mResult['gehalt'];


$yearSQL = "SELECT sum(gehalt) AS gehalt FROM zeiten WHERE ahid = :id AND datum BETWEEN :fdy AND CURDATE()";

$stmt = $conn->prepare($yearSQL);

$stmt->bindValue(':id', $_POST['ahid']);
$stmt->bindValue(':fdy', $_POST['firstDayYear']);

$stmt->execute();

$yResult = $stmt->fetch(PDO::FETCH_ASSOC);
$result['year'] = $yResult['gehalt'];

echo json_encode($result);

$conn = null;
