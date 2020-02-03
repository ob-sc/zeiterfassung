<?php
require '../scripts/connect.php';

# TODO daten überprüfen und ggf. die(bla);
# aktuell wird einfach nix eingetragen wenn typ nicht stimmt, obwohl alles als string kommt

$sql = "UPDATE aushilfen SET status = :status, norlohn = :norlohn, samlohn = :samlohn, sonlohn = :sonlohn WHERE id = :id";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':status', $_POST['status']);
$stmt->bindValue(':norlohn', $_POST['norlohn']);
$stmt->bindValue(':samlohn', $_POST['samlohn']);
$stmt->bindValue(':sonlohn', $_POST['sonlohn']);
$stmt->bindValue(':id', $_POST['id']);

$stmt->execute();

$conn = null;
