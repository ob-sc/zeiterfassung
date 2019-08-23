<?php
require '../req/expire.php';
require '../req/connect.php';

$name = $_POST['name'];
$nlohn = $_POST['nlohn'];
$salohn = $_POST['salohn'];
$solohn = $_POST['solohn'];
$radio = $_POST['optradio'];
$station = $_SESSION['station'];

if ($radio == 'anlegen') {
    $sql = "INSERT IGNORE INTO aushilfen (name, norlohn, samlohn, sonlohn, station) VALUES (:name, :nlohn, :salohn, :solohn, :station)";
    $stmt = $conn->prepare($sql);

    $stmt->bindValue(':name', $name);
    $stmt->bindValue(':nlohn', $nlohn);
    $stmt->bindValue(':salohn', $salohn);
    $stmt->bindValue(':solohn', $solohn);
    $stmt->bindValue(':station', $station);

    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo "Aushilfe eingetragen";
    } else {
        echo "Aushilfe gibt es bereits";
    }
} else {
    $sql = "UPDATE aushilfen SET norlohn = :nlohn, samlohn = :salohn , sonlohn = :solohn WHERE name = :name";
    $stmt = $conn->prepare($sql);

    $stmt->bindValue(':name', $name);
    $stmt->bindValue(':nlohn', $nlohn);
    $stmt->bindValue(':salohn', $salohn);
    $stmt->bindValue(':solohn', $solohn);

    $stmt->execute();

    echo "Aushilfe bearbeitet";
}
$conn = null;
?>
