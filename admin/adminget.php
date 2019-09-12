<?php
require '../req/expire.php';
require '../req/connect.php';

/* AUSHILFEN */
$stmt = $conn->query("SELECT vorname, nachname FROM aushilfen");
$namenResult = $stmt->fetchAll(PDO::FETCH_ASSOC);

$namen = [];
foreach ($namenResult as $value) {
    $vollerName = $value['vorname'] . " " . $value['nachname'];
    $namen[] = $vollerName;
}

/* ZEITEN */
// SQL ohne Filter
$zeitenSql = "SELECT ahid, name, datum, beginn, ende, arbeitszeit, gehalt, disponent, station FROM zeiten WHERE datum BETWEEN :von AND :bis";

// Konstruire Filter wenn Inputs nicht leer sind
$aushilfe = $_POST['aush'];
if (!empty($aushilfe)) $zeitenSql .= " AND name = :aushilfe";

$disponent = $_POST['disp'];
if (!empty($disponent)) $zeitenSql .= " AND disponent = :disponent";

$station = $_POST['stat'];
if (!empty($station)) $zeitenSql .= " AND station = :station";

$zeitenSql .= " ORDER BY datum ASC, beginn ASC";

// Prepare und Fetch
$stmt = $conn->prepare($zeitenSql);

$stmt->bindValue(':von', $_POST['von']);
$stmt->bindValue(':bis', $_POST['bis']);
if (!empty($aushilfe)) $stmt->bindValue(':aushilfe', $aushilfe);
if (!empty($disponent)) $stmt->bindValue(':disponent', $disponent);
if (!empty($station)) $stmt->bindValue(':station', $station);

$stmt->execute();

$zeiten = $stmt->fetchAll(PDO::FETCH_ASSOC);



echo json_encode([
    'namen' => $namen,
    'zeiten' => $zeiten,
]);

$conn = null;
