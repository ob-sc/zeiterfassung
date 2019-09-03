<?php
require '../req/expire.php';
require '../req/connect.php';

$von = $_POST['von'];
$bis = $_POST['bis'];
$aushilfe = $_POST['aush'];
$disponent = $_POST['disp'];
$station = $_POST['stat'];

$sql = "
";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':', $);

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($result as $v) {
    $name = $v['vorname'] . " " . $v['nachname'];
    $daten[$name] = ['name' => $name, 'vorname' => $v['vorname'], 'nachname' => $v['nachname'], 'arbeitszeit' => $v['SUM(arbeitszeit)'], 'personalnr' => $v['personalnr'], 'gehalt' => $v['SUM(gehalt)'], 'tage' => $v['COUNT(DISTINCT datum)'], 'status' => $v['status']];
}

echo json_encode($daten);

$conn = null;
?>
