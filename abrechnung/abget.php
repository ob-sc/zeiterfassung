<?php
require '../req/expire.php';
require '../req/connect.php';

$station = $_SESSION['station'];

$monjahr = $_POST['monat'];
$monat = substr($monjahr, 5, 2);
$jahr = substr($monjahr, 0, 4);


// JOIN mit personalnr. (über name?)
$sql = "SELECT personalnr, name FROM aushilfen WHERE station = :station";
$stmt = $conn->prepare($sql);

$stmt->bindValue('station', $station);

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$personalnr = [];

foreach ($result as $v) {
    $personalnr[$v['name']] = $v['personalnr'];
}

$sql = 
"SELECT name, SUM(arbeitszeit), SUM(gehalt), COUNT(DISTINCT datum) 
FROM zeiten 
WHERE YEAR(datum) = :jahr AND MONTH(datum) = :monat AND station = :station 
GROUP BY name";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':monat', $monat);
$stmt->bindValue(':jahr', $jahr);
$stmt->bindValue(':station', $station);

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$daten = [];

foreach ($result as $v) {
    $daten[$v['name']] = ['arbeitszeit' => $v['SUM(arbeitszeit)'], 'gehalt' => $v['SUM(gehalt)'], 'tage' => $v['COUNT(DISTINCT datum)']];
}

# https://www.w3schools.com/js/js_json_objects.asp
echo json_encode([
    'personalnr' => $personalnr,
    'daten' => $daten
]);

$conn = null;
?>