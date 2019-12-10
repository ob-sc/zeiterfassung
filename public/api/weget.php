<?php
session_start();
require '../scripts/connect.php';

$weSql = 
"SELECT id, datum, name, stunden, ausgleich
FROM wochenende
WHERE station = ? 
-- WHERE z.datum BETWEEN :von AND :bis
ORDER BY datum ASC";

$stmt = $conn->prepare($weSql);

$stmt->execute(array($_SESSION['station']));

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

$conn = null;
