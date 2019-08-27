<?php
require '../req/expire.php';
require '../req/connect.php';

# TODO daten überprüfen und ggf. die(bla);
# aktuell wird einfach nix eingetragen wenn typ nicht stimmt, obwohl alles als string kommt

$id = $_POST['id'];
$personalnr = $_POST['personalnr'];
$name = $_POST['name'];
$norlohn = $_POST['norlohn'];
$samlohn = $_POST['samlohn'];
$sonlohn = $_POST['sonlohn'];

$sql = "UPDATE aushilfen SET personalnr = :personalnr, name = :name, norlohn = :norlohn, samlohn = :samlohn, sonlohn = :sonlohn WHERE id = :id";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':personalnr', $personalnr);
$stmt->bindValue(':name', $name);
$stmt->bindValue(':norlohn', $norlohn);
$stmt->bindValue(':samlohn', $samlohn);
$stmt->bindValue(':sonlohn', $sonlohn);
$stmt->bindValue(':id', $id);

$stmt->execute();

$conn = null;
?>
