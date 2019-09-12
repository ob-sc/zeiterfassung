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

/* DISPONENTEN */
$stmt = $conn->query("SELECT username FROM benutzer");
$dispResult = $stmt->fetchAll(PDO::FETCH_COLUMN);



/* ZEITEN */
// Disponent aus Filter
$dispPost = $_POST['disp'];
if (!empty($dispPost)) {
    $stmt = $conn->prepare("SELECT id from benutzer WHERE username = :dispPost");
    $stmt->bindValue(':dispPost', $dispPost);
    $stmt->execute();
    $disponent = $stmt->fetch(PDO::FETCH_COLUMN);
}

// SQL ohne Filter
// todo join -> z.station raus?
$zeitenSql = 
"SELECT z.id, z.name, z.datum, z.beginn, z.ende, z.arbeitszeit, z.gehalt, z.disponent, z.station, z.reg_date, s.name AS statname, b.username
FROM zeiten AS z 
LEFT JOIN stationen AS s ON z.station = s.id 
LEFT JOIN benutzer AS b ON z.disponent = b.id 
WHERE z.datum BETWEEN :von AND :bis";

// Konstruire Filter wenn Inputs nicht leer sind
$aushilfe = $_POST['aush'];
if (!empty($aushilfe)) $zeitenSql .= " AND z.name = :aushilfe";

$station = $_POST['stat'];
if (!empty($station)) $zeitenSql .= " AND z.station = :station";

if (!empty($dispPost)) $zeitenSql .= " AND z.disponent = :disponent ";

$zeitenSql .= " ORDER BY z.datum ASC, z.beginn ASC";

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
    'disponenten' => $dispResult
]);

$conn = null;
