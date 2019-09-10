<?php
require '../req/expire.php';
require '../req/connect.php';

$von = $_POST['von'];
$bis = $_POST['bis'];
$aushilfe = $_POST['aush'];
$disponent = $_POST['disp'];
$station = $_POST['stat'];

$sql = "SELECT name, datum, beginn, ende, arbeitszeit, gehalt, disponent, station FROM zeiten";



$stmt = $conn->prepare($sql);

#$stmt->bindValue(':', $);

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

$conn = null;
