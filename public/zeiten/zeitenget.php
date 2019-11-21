<?php
require '../req/session.php';
require '../req/connect.php';

# limit 

$zeitenSql = 
"SELECT z.name, z.datum, z.beginn, z.ende, z.arbeitszeit, z.gehalt, z.disponent, z.reg_date, b.username
FROM zeiten AS z 
LEFT JOIN benutzer AS b ON z.disponent = b.id 
WHERE z.station = ? 
-- WHERE z.datum BETWEEN :von AND :bis
ORDER BY z.datum ASC, z.beginn ASC";

$stmt = $conn->prepare($zeitenSql);

$stmt->execute(array($_SESSION['station']));

$zeitenResult = $stmt->fetchAll(PDO::FETCH_ASSOC);

$zeiten = [];

foreach ($zeitenResult as $value) {
  $zeiten[] = [
    $value['datum'],
    $value['name'],
    $value['beginn'],
    $value['ende'],
    $value['arbeitszeit'],
    $value['gehalt'],
    $value['username'],
    $value['reg_date']
  ];
}

echo json_encode($zeiten);

$conn = null;
