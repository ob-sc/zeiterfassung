<?php
require '../scripts/connect.php';

// alle aushilfen der station -> leer
$aushilfenSql = 
"SELECT id, vorname, nachname, personalnr, status, 0 AS arbeitszeit, 0 AS gehalt, 0 AS datum, 0 AS urlaub 
FROM aushilfen 
WHERE station = ?";

$stmt = $conn->prepare($aushilfenSql);
$stmt->execute(array($_SESSION['station']));

$aushilfen = [];
$ndAushilfen = [];

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$aushilfen[$row['id']] = $row;
	$ndAushilfen[$row['id']] = $row;
}


// abrechnungszeitraum vorbereiten
$beginnDate = new DateTime($_POST['monat'].'-17');
$beginnDate->sub(new DateInterval('P1M'));
$endDate = new DateTime($_POST['monat'].'-16');


// alle arbeitszeiten holen für station
$zeitenSql = 
"SELECT ahid, SUM(arbeitszeit) AS arbeitszeit, SUM(gehalt) AS gehalt, COUNT(DISTINCT datum) AS datum, ahstation 
FROM zeiten 
WHERE datum BETWEEN :beginnDate AND :endDate AND station = :station AND station = ahstation 
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
	$aushilfen[$row['ahid']]['ahstation'] = $row['ahstation'];
}

// Zeiten der Fremd-Aushilfen
$fremdZeitenSql = 
"SELECT ahid AS id, SUM(arbeitszeit) AS arbeitszeit, SUM(gehalt) AS gehalt, COUNT(DISTINCT datum) AS datum, ahstation 
FROM zeiten 
WHERE datum BETWEEN :beginnDate AND :endDate AND station = :station AND station != ahstation 
GROUP BY ahid";

$stmt = $conn->prepare($fremdZeitenSql);

$stmt->bindValue(':beginnDate', $beginnDate->format('Y-m-d'));
$stmt->bindValue(':endDate', $endDate->format('Y-m-d'));
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->execute();

$fremdDaten = [];

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$fremdDaten[$row['id']] = $row;
}

// Daten der Fremd-Aushilfen 
$fremdSql = "SELECT id, vorname, nachname, personalnr, status FROM aushilfen WHERE id = :ahid";
$stmt = $conn->prepare($fremdSql);

foreach ($fremdDaten as $value) {
	$stmt->bindValue(':ahid', $value['id']);
	$stmt->execute();
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		$fremdDaten[$row['id']]['vorname'] = $row['vorname'];
		$fremdDaten[$row['id']]['nachname'] = $row['nachname'];
		$fremdDaten[$row['id']]['personalnr'] = $row['personalnr'];
		$fremdDaten[$row['id']]['status'] = $row['status'];
	}
}

// alle arbeitstage im ausgewählten kompletten jahr / auch in anderer Station
$urlaubSql = 
"SELECT ahid, COUNT(DISTINCT datum) AS urlaub 
FROM zeiten 
WHERE datum BETWEEN :beginnDate AND :endDate AND ahstation = :station 
GROUP BY ahid";

$stmt = $conn->prepare($urlaubSql);

$stmt->bindValue(':beginnDate', $beginnDate->format('Y-m-d'));
$stmt->bindValue(':endDate', $endDate->format('Y-m-d'));
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->execute();

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$aushilfen[$row['ahid']]['urlaub'] = $row['urlaub'];
}

// notdienst
// notdienst wird durch beginn = 'nd' gekennzeichnet und in json als urlaub übertragen
$notdienstSql = 
"SELECT ahid, beginn, sum(gehalt) AS gehalt, ahstation
FROM zeiten 
WHERE datum BETWEEN :beginnDate AND :endDate AND station = :station AND beginn = 'nd' 
GROUP BY ahid";

$stmt = $conn->prepare($notdienstSql);

$stmt->bindValue(':beginnDate', $beginnDate->format('Y-m-d'));
$stmt->bindValue(':endDate', $endDate->format('Y-m-d'));
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->execute();

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$ndAushilfen[$row['ahid']]['gehalt'] = $row['gehalt'];
	$ndAushilfen[$row['ahid']]['ahstation'] = $row['ahstation'];
	$ndAushilfen[$row['ahid']]['urlaub'] = $row['beginn'];
}

// array aus objekt
$daten = [];
$ndDaten = [];
foreach($aushilfen as $entry) {
	$daten[] = $entry;
}
unset($entry);
foreach($fremdDaten as $entry) {
	$daten[] = $entry;
}
unset($entry);
foreach($ndAushilfen as $entry) {
	$ndDaten[] = $entry;
}
unset($entry);

echo json_encode([
	'daten' => $daten,
	'ndDaten' => $ndDaten
]);

$conn = null;
