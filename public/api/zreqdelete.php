<?php
require '../scripts/connect.php';

// check ob schon in db
$stmt = $conn->prepare("SELECT id FROM reqdelete WHERE zeitid = :id");

$stmt->bindValue(':id', $_POST['id']);

$stmt->execute();

if ($stmt->rowCount() !== 0) {
  http_response_code(500);
  $conn = null;
  die('Die Zeit wurde schon gemeldet');
}

// eintragen
$stmt = $conn->prepare("INSERT INTO `reqdelete`(`zeitid`, `user`, `station`) VALUES (:id, :user, :station)");

$stmt->bindValue(':id', $_POST['id']);
$stmt->bindValue(':user', $_SESSION['userid']);
$stmt->bindValue(':station', $_SESSION['station']);

$stmt->execute();

$conn = null;
