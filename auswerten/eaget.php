<?php
require '../req/expire.php';
require '../req/connect.php';

$name = $_POST['name'];
$station = $_SESSION['station'];
$monJahr = $_POST['monat'];
$monat = substr($monJahr, 5, 2);
$jahr = substr($monJahr, 0, 4);

$sql = "SELECT datum, beginn, ende, SUM(arbeitszeit), SUM(gehalt), COUNT(DISTINCT datum) FROM zeiten WHERE name = :name AND station = :station AND YEAR(datum) = :jahr AND MONTH(datum) = :monat";

$stmt->bindValue(':name', $name);
$stmt->bindValue(':station', $station);
$stmt->bindValue(':jahr', $jahr);
$stmt->bindValue(':monat', $monat);

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

json_encode($result);

$conn = null;
?>
