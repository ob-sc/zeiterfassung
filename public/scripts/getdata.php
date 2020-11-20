<?php
require 'connect.php';

// aushilfen der Station mit löhnen -> station dazu?
$aushilfenSql = "SELECT id, personalnr, vorname, nachname, norlohn, samlohn, sonlohn, status FROM aushilfen WHERE station = ?";

$stmt = $conn->prepare($aushilfenSql);

$stmt->execute(array($_SESSION['station']));

$ahResult = $stmt->fetchAll(PDO::FETCH_ASSOC);

$stationNamen = [];
$ahDaten = [];

foreach ($ahResult as $value) {
  $vollerName = $value['vorname'] . " " . $value['nachname'];
  $stationNamen[] = $vollerName;
  $ahDaten[$vollerName] = [
    'id' => $value['id'], 
    'personalnr' => $value['personalnr'], 
    'vorname' => $value['vorname'],
    'nachname' => $value['nachname'],
    'norlohn' => $value['norlohn'], 
    'samlohn' => $value['samlohn'], 
    'sonlohn' => $value['sonlohn'], 
    'ahStatus' => $value['status'], 
    'fs' => $value['fs-kontrolle']
  ];
}

// alle aushilfen 
$stmt = $conn->query("SELECT id, personalnr, vorname, nachname, norlohn, samlohn, sonlohn, status, station, reg_date FROM aushilfen");
$alleResult = $stmt->fetchAll(PDO::FETCH_ASSOC);

$alleNamen = [];
$alleDaten = [];
foreach ($alleResult as $value) {
  $vollerNameAlle = $value['vorname'] . " " . $value['nachname'];
  $alleNamen[] = $vollerNameAlle;
  $alleDaten[$vollerNameAlle] = [
    'id' => $value['id'], 
    'personalnr' => $value['personalnr'], 
    'norlohn' => $value['norlohn'], 
    'samlohn' => $value['samlohn'], 
    'sonlohn' => $value['sonlohn'], 
    'ahStatus' => $value['status'], 
    'station' => $value['station'],
    'reg_date' => $value['reg_date'], 
    // 'fs' => $value['fs-kontrolle']
  ];
}

$stationResult = $stmt->fetch(PDO::FETCH_ASSOC);

$mitarbeiterSql = "SELECT id, username, status FROM benutzer WHERE station = ?";

$stmt = $conn->prepare($mitarbeiterSql);
$stmt->execute(array($_SESSION['station']));

$maResult = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
  'stationNamen' => $stationNamen,
  'ahDaten' => $ahDaten,
  'alleNamen' => $alleNamen,
  'alleDaten' => $alleDaten,
  'maDaten' => $maResult
]);

$conn = null;
