<?php
require '../req/expire.php';
require '../req/connect.php';

$station = $_SESSION['station'];

$sql = "SELECT name, norlohn, samlohn, sonlohn FROM aushilfen WHERE station = :station";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':station', $station);

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$namen = [];
$lohn = [];


foreach ($result as $value) {
    $namen[] = $value['name'];
    $lohn[$value['name']] = ['norlohn' => $value['norlohn'], 'samlohn' => $value['samlohn'], 'sonlohn' => $value['sonlohn']];
}

echo json_encode([
    'namen' => $namen,
    'loehne' => $lohn,
]);


$conn = null;
?>