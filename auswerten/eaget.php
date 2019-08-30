<?php
require '../req/expire.php';
require '../req/connect.php';

$name = $_POST['name'];
$station = $_SESSION['station'];
$monJahr = $_POST['monat'];
$monat = substr($monJahr, 5, 2);
$monatDavor = $monat - 1;
$jahr = substr($monJahr, 0, 4);

$beginnString = "{$jahr}-0{$monatDavor}-10";
$endeString = "{$jahr}-{$monat}-9";

#10.juli bis 9. august ist august

// TODO geht 1 Query?
// QUERY 1 mehrere Reihen
$sql = "SELECT datum, beginn, ende, arbeitszeit, gehalt FROM zeiten WHERE name = :name AND station = :station AND datum BETWEEN CAST('$beginnString' AS DATE) AND CAST('$endeString' AS DATE) ORDER BY datum ASC, beginn ASC";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $name);
$stmt->bindValue(':station', $station);

$stmt->execute();

$result1 = $stmt->fetchAll(PDO::FETCH_ASSOC);

// QUERY 2 Zähl-Funktionen
$sql = "SELECT SUM(arbeitszeit), SUM(gehalt), COUNT(DISTINCT datum) FROM zeiten WHERE name = :name AND station = :station AND datum BETWEEN CAST('$beginnString' AS DATE) AND CAST('$endeString' AS DATE)";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $name);
$stmt->bindValue(':station', $station);

$stmt->execute();

$result2 = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'tage' => $result1,
    'summe' => $result2
]);

$conn = null;
?>
