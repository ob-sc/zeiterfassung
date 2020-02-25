<?php
require '../scripts/connect.php';

$stationen = $_POST['statID'];

$result = [];

foreach ($stationen as $v) {
	$station = $v;

	// alle aushilfen der station -> leer
	$aushilfenSql = 
	"SELECT id, personalnr, nachname, vorname, 0 AS arbeitszeit, 0 AS gehalt, 0 AS datum, 0 AS urlaub , status 
	FROM aushilfen 
	WHERE station = ?";

	$stmt = $conn->prepare($aushilfenSql);
	$stmt->execute(array($station));

	$aushilfen = [];
	$ndAushilfen = [];

	while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		$aushilfen[$row['id']] = $row;
		$ndAushilfen[$row['id']] = $row;
	}

	// abrechnungszeitraum vorbereiten
	$heute = new DateTime();
	$monatJahr = $heute->format('Y-m');

	$endDate = new DateTime($monatJahr.'-17');
	$beginnDate = new DateTime($monatJahr.'-18');
	$beginnDate->sub(new DateInterval('P1M'));


	// alle arbeitszeiten holen für station
	$zeitenSql = 
	"SELECT ahid, SUM(arbeitszeit) AS arbeitszeit, SUM(gehalt) AS gehalt, COUNT(DISTINCT datum) AS datum 
	FROM zeiten 
	WHERE datum BETWEEN :beginnDate AND :endDate AND ahstation = :station 
	GROUP BY ahid";

	$stmt = $conn->prepare($zeitenSql);

	$stmt->bindValue(':beginnDate', $beginnDate->format('Y-m-d'));
	$stmt->bindValue(':endDate', $endDate->format('Y-m-d'));
	$stmt->bindValue(':station', $station);
	$stmt->execute();

	while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		$aushilfen[$row['ahid']]['arbeitszeit'] = $row['arbeitszeit'];
		$aushilfen[$row['ahid']]['gehalt'] = $row['gehalt'];
		$aushilfen[$row['ahid']]['datum'] = $row['datum'];
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
	$stmt->bindValue(':station', $station);
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

	// Urlaubszeitraum vorbereiten
	$year = date('Y');
	$yearPrev = date('Y') - 1;
	$beginnUrlaub = date('Y-m-d', mktime(0, 0, 0, 12, 18, $yearPrev));
	$endUrlaub = date('Y-m-d', mktime(0, 0, 0, 12, 17, $year));

	// alle arbeitstage im ausgewählten kompletten jahr / auch in anderer Station
	$urlaubSql = 
	"SELECT ahid, COUNT(DISTINCT datum) AS urlaub 
	FROM zeiten 
	WHERE datum BETWEEN :beginnDate AND :endDate AND ahstation = :station 
	GROUP BY ahid";

	$stmt = $conn->prepare($urlaubSql);

	$stmt->bindValue(':beginnDate', $beginnUrlaub);
	$stmt->bindValue(':endDate', $endUrlaub);
	$stmt->bindValue(':station', $station);
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
	$stmt->bindValue(':station', $station);
	$stmt->execute();

	while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
		$ndAushilfen[$row['ahid']]['gehalt'] = $row['gehalt'];
		$ndAushilfen[$row['ahid']]['ahstation'] = $row['ahstation'];
		$ndAushilfen[$row['ahid']]['urlaub'] = $row['beginn'];
	}

	// WE-Listen
	// abrechnungszeitraum vorbereiten
	$weBeginnDate = new DateTime('first day of last month');
	$weEndDate = new DateTime('last day of last month');

	$weSql = 
	"SELECT id, datum, name, stunden, ausgleich
	FROM wochenende
	WHERE station = :station 
	AND datum BETWEEN :von AND :bis 
	ORDER BY datum ASC";

	$stmt = $conn->prepare($weSql);

	$stmt->bindValue(':von', $weBeginnDate->format('Y-m-d'));
	$stmt->bindValue(':bis', $weEndDate->format('Y-m-d'));
	$stmt->bindValue(':station', $station);

	$stmt->execute();

  $weListe = $stmt->fetchAll(PDO::FETCH_ASSOC);

	// array aus objekt
	$normal = [];
	$fremd = [];
	$notdienst = [];
	foreach($aushilfen as $entry) {
		$normal[] = $entry;
	}
	unset($entry);
	foreach($fremdDaten as $entry) {
		$fremd[] = $entry;
	}
	unset($entry);
	foreach($ndAushilfen as $entry) {
		$notdienst[] = $entry;
	}
	unset($entry);

	// Abrechnung für diese Station
	$result[$v]['normal'] = $normal;
	$result[$v]['fremd'] = $fremd;
	$result[$v]['notdienst'] = $notdienst;
	$result[$v]['we'] = $weListe;
}

echo json_encode($result);

$conn = null;
