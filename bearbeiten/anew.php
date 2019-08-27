<?php
require '../req/expire.php';
require '../req/connect.php';

$personalnr = $_POST['personalnr'];
$name = $_POST['name'];
$norlohn = $_POST['norlohn'];
$samlohn = $_POST['samlohn'];
$sonlohn = $_POST['sonlohn'];
$station = $_SESSION['station'];

$sql = "INSERT INTO aushilfen (personalnr, name, norlohn, samlohn, sonlohn, station) VALUES (personalnr = :personalnr, name = :name, norlohn = :norlohn, samlohn = :samlohn, sonlohn = :sonlohn, station = :station";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':personalnr', $personalnr);
$stmt->bindValue(':name', $name);
$stmt->bindValue(':norlohn', $norlohn);
$stmt->bindValue(':samlohn', $samlohn);
$stmt->bindValue(':sonlohn', $sonlohn);
$stmt->bindValue(':station', $station);

$stmt->execute();

$conn = null;
?>
