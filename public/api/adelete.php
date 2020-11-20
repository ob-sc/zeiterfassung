<?php
require '../scripts/connect.php';

$sql = "SELECT * FROM aushilfen 
WHERE id = ?";

$stmt = $conn->prepare($sql);
$stmt->execute(array($_POST['id']));

$ah = $stmt->fetch(PDO::FETCH_ASSOC);

$sql = "INSERT INTO ah_abgemeldet (ahid, personalnr, vorname, nachname, norlohn, samlohn, sonlohn, station, status, fs_kontrolle, reg_date) 
VALUES (:ahid, :personalnr, :vorname, :nachname, :norlohn, :samlohn, :sonlohn, :station, :status, fs_kontrolle, reg_date)";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':ahid', $ah['id']);
$stmt->bindValue(':personalnr', $ah['personalnr']);
$stmt->bindValue(':vorname', $ah['vorname']);
$stmt->bindValue(':nachname', $ah['nachname']);
$stmt->bindValue(':norlohn', $ah['norlohn']);
$stmt->bindValue(':samlohn', $ah['samlohn']);
$stmt->bindValue(':sonlohn', $ah['sonlohn']);
$stmt->bindValue(':station', $ah['station']);
$stmt->bindValue(':status', $ah['status']);
$stmt->bindValue(':fs_kontrolle', $ah['fs_kontrolle']);
$stmt->bindValue(':reg_date', $ah['reg_date']);

$conn = null;
