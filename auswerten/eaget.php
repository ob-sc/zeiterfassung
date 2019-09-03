<?php
require '../req/expire.php';
require '../req/connect.php';

$id = $_POST['id'];
$station = $_SESSION['station'];
$monJahr = $_POST['datum'];
$monat = substr($monJahr, 5, 2);
$monatDavor = $monat - 1;
$jahr = substr($monJahr, 0, 4);

$beginnString = "{$jahr}-0{$monatDavor}-10";
$endeString = "{$jahr}-{$monat}-9";

#10.juli bis 9. august ist august

// TODO geht 1 Query?
// QUERY 1 mehrere Reihen
$sql = "SELECT datum, beginn, ende, arbeitszeit, gehalt FROM zeiten WHERE ahid = :id AND station = :station AND datum BETWEEN CAST('$beginnString' AS DATE) AND CAST('$endeString' AS DATE) ORDER BY datum ASC, beginn ASC";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':id', $id);
$stmt->bindValue(':station', $station);

$stmt->execute();

$result1 = $stmt->fetchAll(PDO::FETCH_ASSOC);

// QUERY 2 Zähl-Funktionen
$sql = "SELECT SUM(arbeitszeit), SUM(gehalt), COUNT(DISTINCT datum) FROM zeiten WHERE ahid = :id AND station = :station AND datum BETWEEN CAST('$beginnString' AS DATE) AND CAST('$endeString' AS DATE)";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':id', $id);
$stmt->bindValue(':station', $station);

$stmt->execute();

$result2 = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'tage' => $result1,
    'summe' => $result2,
    'monat' => $monat,
    'jahr' => $jahr
]);

$conn = null;
?>
