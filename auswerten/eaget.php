<?php
require '../req/expire.php';
require '../req/connect.php';

$name = $_POST['name'];
$station = $_SESSION['station'];
$monJahr = $_POST['monat'];
$monat = substr($monJahr, 5, 2);
$jahr = substr($monJahr, 0, 4);

// TODO geht 1 Query?
// QUERY 1 mehrere Reihen
$sql = "SELECT datum, beginn, ende, arbeitszeit, gehalt FROM zeiten WHERE name = :name AND station = :station AND YEAR(datum) = :jahr AND MONTH(datum) = :monat ORDER BY datum ASC, beginn ASC";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $name);
$stmt->bindValue(':station', $station);
$stmt->bindValue(':jahr', $jahr);
$stmt->bindValue(':monat', $monat);

$stmt->execute();

$result1 = $stmt->fetchAll(PDO::FETCH_ASSOC);

// QUERY 2 Zähl-Funktionen
$sql = "SELECT SUM(arbeitszeit), SUM(gehalt), COUNT(DISTINCT datum) FROM zeiten WHERE name = :name AND station = :station AND YEAR(datum) = :jahr AND MONTH(datum) = :monat";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $name);
$stmt->bindValue(':station', $station);
$stmt->bindValue(':jahr', $jahr);
$stmt->bindValue(':monat', $monat);

$stmt->execute();

$result2 = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'tage' => $result1,
    'summe' => $result2
]);

$conn = null;
?>
