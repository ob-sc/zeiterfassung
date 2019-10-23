<?php
require '../req/expire.php';
require '../req/connect.php';

# todo check ob schon existiert dann die() oder echo mit fehler

$sql = "UPDATE aushilfen SET personalnr = :pn WHERE id = :id";

$stmt = $conn->prepare($sql);

foreach ($_POST as $key => $value) {
  $stmt->bindValue(':id', $key);
  $stmt->bindValue(':pn', $value);
  $stmt->execute();
}

$conn = null;
