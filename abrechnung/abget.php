<?php
require '../req/expire.php';
require '../req/connect.php';

#10.juli bis 9. august ist august

// alle aushilfen der station -> leer
$aushilfenSql = 
"SELECT id, vorname, nachname, personalnr, status, 0 AS arbeitszeit, 0 AS gehalt, 0 AS datum, 0 AS urlaub
FROM aushilfen
WHERE station = :station
ORDER BY nachname ASC";

$stmt = $conn->prepare($aushilfenSql);

$aushilfen = [];

$stmt->bindValue(':station', $_SESSION['station']);
$stmt->execute();

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$aushilfen[$row['id']] = $row;
}


// abrechnungszeitraum vorbereiten
$beginnDate = new DateTime($_POST['monat'].'-10');
$beginnDate->sub(new DateInterval('P1M'));
$endDate = new DateTime($_POST['monat'].'-09');


// alle arbeitszeiten holen für abrechnungszeitraum
$zeitenSql = 
"SELECT ahid, SUM(arbeitszeit) AS arbeitszeit, SUM(gehalt) AS gehalt, COUNT(DISTINCT datum) AS datum  
FROM zeiten 
WHERE datum BETWEEN :beginnDate AND :endDate AND station = :station 
GROUP BY ahid";

$stmt = $conn->prepare($zeitenSql);

$stmt->bindValue(':beginnDate', $beginnDate->format('Y-m-d'));
$stmt->bindValue(':endDate', $endDate->format('Y-m-d'));
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->execute();

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$aushilfen[$row['ahid']]['arbeitszeit'] = $row['arbeitszeit'];
	$aushilfen[$row['ahid']]['gehalt'] = $row['gehalt'];
	$aushilfen[$row['ahid']]['datum'] = $row['datum'];
}


// daten für urlaub -> anfang des jahres bis ende
$firstDay = new DateTime('first day of january '.$_POST['monat']);
$lastDay = new DateTime('last day of december'.$_POST['monat']);

// alle arbeitstage im ausgewählten kompletten jahr
$urlaubSql = 
"SELECT ahid, COUNT(DISTINCT datum) AS urlaub 
FROM zeiten 
WHERE datum BETWEEN :beginnDate AND :endDate AND station = :station 
GROUP BY ahid";

$stmt = $conn->prepare($urlaubSql);

$stmt->bindValue(':beginnDate', $firstDay->format('Y-m-d'));
$stmt->bindValue(':endDate', $lastDay->format('Y-m-d'));
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->execute();
while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$aushilfen[$row['ahid']]['urlaub'] = $row['urlaub'];
}

echo json_encode($aushilfen);

$conn = null;
