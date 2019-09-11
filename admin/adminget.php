<?php
require '../req/expire.php';
require '../req/connect.php';

$von = $_POST['von'];
if (empty($von)) $von = "2000-01-01";

$bis = $_POST['bis'];
if (empty($bis)) $bis = "3000-01-01";

$sql = "SELECT ahid, name, datum, beginn, ende, arbeitszeit, gehalt, disponent, station FROM zeiten WHERE datum BETWEEN :von AND :bis";

$aushilfe = $_POST['aush'];
if (!empty($aushilfe)) $sql .= " AND name = :aushilfe";

$disponent = $_POST['disp'];
if (!empty($disponent)) $sql .= " AND disponent = :disponent";

$station = $_POST['stat'];
if (!empty($station)) $sql .= " AND station = :station";

$sql .= " ORDER BY datum ASC, beginn ASC LIMIT 300";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':von', $von);
$stmt->bindValue(':bis', $bis);
if (!empty($aushilfe)) $stmt->bindValue(':aushilfe', $aushilfe);
if (!empty($disponent)) $stmt->bindValue(':disponent', $disponent);
if (!empty($station)) $stmt->bindValue(':station', $station);

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($result);

$conn = null;
