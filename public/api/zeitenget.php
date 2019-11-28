<?php
session_start();
require '../scripts/connect.php';

# todo limit 

$zeitenSql = 
"SELECT z.id, z.name, z.datum, z.beginn, z.ende, z.arbeitszeit, z.gehalt, z.disponent, z.reg_date, b.username
FROM zeiten AS z 
LEFT JOIN benutzer AS b ON z.disponent = b.id 
WHERE z.station = ? 
-- WHERE z.datum BETWEEN :von AND :bis
ORDER BY z.datum ASC, z.beginn ASC";

$stmt = $conn->prepare($zeitenSql);

$stmt->execute(array($_SESSION['station']));

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

$conn = null;
