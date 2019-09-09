<?php
require '../req/expire.php';
require '../req/connect.php';

$aushilfenSql = "SELECT id, personalnr, vorname, nachname, norlohn, samlohn, sonlohn, status FROM aushilfen WHERE station = ?";

$stmt = $conn->prepare($aushilfenSql);

$stmt->execute(array($_SESSION['station']));

$ahResult = $stmt->fetchAll(PDO::FETCH_ASSOC);

$namen = [];
$ahDaten = [];

foreach ($ahResult as $value) {
    $vollerName = $value['vorname'] . " " . $value['nachname'];
    $namen[] = $vollerName;
    $ahDaten[$vollerName] = ['id' => $value['id'], 'personalnr' => $value['personalnr'], 'norlohn' => $value['norlohn'], 'samlohn' => $value['samlohn'], 'sonlohn' => $value['sonlohn'], 'ahStatus' => $value['status']];
}

$stationSql = "SELECT name FROM stationen WHERE id = ?";

$stmt = $conn->prepare($stationSql);
$stmt->execute(array($_SESSION['station']));

$stationResult = $stmt->fetch(PDO::FETCH_ASSOC);

$mitarbeiterSql = "SELECT id, username, status FROM benutzer WHERE station = ?";

$stmt = $conn->prepare($mitarbeiterSql);
$stmt->execute(array($_SESSION['station']));

$maResult = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    'station' => $stationResult['name'],
    'status' => $_SESSION['status'],
    'namen' => $namen,
    'ahDaten' => $ahDaten,
    'maDaten' => $maResult
]);

$conn = null;
