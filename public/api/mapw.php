<?php
require '../scripts/connect.php';

$password = !empty($_POST['password']) ? trim($_POST['password']) : null;

// hash & update
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$sql = "UPDATE benutzer SET password = :password WHERE id = :id";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':password', $passwordHash);
$stmt->bindValue(':id', $_POST['id']);

$result = $stmt->execute();

$count = $stmt->rowCount();

// erfolg (oder halt nicht)
if ($count > 0) {
  echo "Passwort geändert";
} else {
  echo "Fehler";
}

$conn = null; 
