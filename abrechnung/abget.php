<?php
require '../req/expire.php';
require '../req/connect.php';

$station = $_SESSION['station'];
$monJahr = $_POST['monat'];
$monat = substr($monJahr, 5, 2);
$monatDavor = $monat - 1;
$jahr = substr($monJahr, 0, 4);

$beginnString = "{$jahr}-0{$monatDavor}-10";
$endeString = "{$jahr}-{$monat}-9";

#10.juli bis 9. august ist august

$sql = 
"SELECT z.ahid, SUM(arbeitszeit), SUM(gehalt), COUNT(DISTINCT datum), ah.vorname, ah.nachname, ah.personalnr, ah.status 
FROM zeiten AS z
LEFT JOIN aushilfen AS ah ON ah.id = z.ahid 
WHERE datum BETWEEN CAST('$beginnString' AS DATE) AND CAST('$endeString' AS DATE) AND z.station = :station 
GROUP BY z.ahid 
ORDER BY ah.nachname ASC";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':station', $station);

$stmt->execute();

$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$daten = [];

foreach ($result as $v) {
    $name = $v['vorname'] . " " . $v['nachname'];
    $daten[$name] = ['name' => $name, 'vorname' => $v['vorname'], 'nachname' => $v['nachname'], 'arbeitszeit' => $v['SUM(arbeitszeit)'], 'personalnr' => $v['personalnr'], 'gehalt' => $v['SUM(gehalt)'], 'tage' => $v['COUNT(DISTINCT datum)'], 'status' => $v['status']];
}

echo json_encode($daten);

$conn = null;
?>
