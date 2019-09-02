<?php
require '../req/expire.php';
require '../req/connect.php';

$station = $_SESSION['station'];
$status = $_SESSION['status'];

// TODO 1 Query?!

$sql = "SELECT id, personalnr, name, norlohn, samlohn, sonlohn, status FROM aushilfen WHERE station = ?";

$stmt = $conn->prepare($sql);

$stmt->execute(array($station));

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$namen = [];
$daten = [];

foreach ($result as $value) {
    $namen[] = $value['name'];
    $daten[$value['name']] = ['id' => $value['id'], 'personalnr' => $value['personalnr'], 'norlohn' => $value['norlohn'], 'samlohn' => $value['samlohn'], 'sonlohn' => $value['sonlohn'], 'ahStatus' => $value['status']];
}

$sql = "SELECT name FROM stationen WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->execute(array($station));

$result = $stmt->fetch(PDO::FETCH_ASSOC);

$stationString = $result['name'];

echo json_encode([
    'station' => $stationString,
    'status' => $status,
    'namen' => $namen,
    'ahDaten' => $daten,
]);


$conn = null;
?>
