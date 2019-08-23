<?php
require '../req/expire.php';
require '../req/connect.php';

$station = $_SESSION['station'];

$sql = "SELECT name, norlohn, samlohn, sonlohn FROM aushilfen WHERE station = ?";

$stmt = $conn->prepare($sql);

$stmt->execute(array($station));

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$namen = [];
$lohn = [];


foreach ($result as $value) {
    $namen[] = $value['name'];
    $lohn[$value['name']] = ['norlohn' => $value['norlohn'], 'samlohn' => $value['samlohn'], 'sonlohn' => $value['sonlohn']];
}

$sql = "SELECT name FROM stationen WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->execute(array($station));

$result = $stmt->fetch(PDO::FETCH_ASSOC);

$stationString = $result['name'];

echo json_encode([
    'station' => $stationString,
    'namen' => $namen,
    'loehne' => $lohn,
]);


$conn = null;
?>
