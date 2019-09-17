<?php
require '../req/expire.php';
require '../req/connect.php';

// alle aushilfen der station -> leer
$aushilfenSql = 
"SELECT id, vorname, nachname, personalnr, status, 0 AS arbeitszeit, 0 AS gehalt, 0 AS datum, 0 AS urlaub 
FROM aushilfen 
WHERE station = ?";

$stmt = $conn->prepare($aushilfenSql);
$stmt->execute(array($_SESSION['station']));

$aushilfen = [];

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$aushilfen[$row['id']] = $row;
}


// abrechnungszeitraum vorbereiten
$beginnDate = new DateTime($_POST['monat'].'-10');
$beginnDate->sub(new DateInterval('P1M'));
$endDate = new DateTime($_POST['monat'].'-09');


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


// Zeitraum für urlaub -> anfang des jahres bis ende / nur stations-aushilfen
$firstDay = new DateTime('first day of january '.$_POST['monat']);
$lastDay = new DateTime('last day of december '.$_POST['monat']);

// alle arbeitstage im ausgewählten kompletten jahr
// todo: fremdeinträge werden nicht gezählt. evtl alle aushilfen der station loopen und alle einträge zählen? (dann werden auch einträge in anderen stationen gezählt)
$urlaubSql = 
"SELECT ahid, COUNT(DISTINCT datum) AS urlaub 
FROM zeiten 
WHERE datum BETWEEN :beginnDate AND :endDate AND station = :station AND station = ahstation 
GROUP BY ahid";

$stmt = $conn->prepare($urlaubSql);

$stmt->bindValue(':beginnDate', $firstDay->format('Y-m-d'));
$stmt->bindValue(':endDate', $lastDay->format('Y-m-d'));
$stmt->bindValue(':station', $_SESSION['station']);
$stmt->execute();

while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
	$aushilfen[$row['ahid']]['urlaub'] = $row['urlaub'];
}

// array aus objekt
$daten = [];
foreach($aushilfen as $entry) {
	$daten[] = $entry;
}
#$fremd = [];
foreach($fremdDaten as $entry) {
	$daten[] = $entry;
}

echo json_encode([
	'daten' => $daten,
	#'fremd' => $fremd,
	#'fremdzeiten' => $fremdZeiten
]);

$conn = null;
