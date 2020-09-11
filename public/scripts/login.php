<?php
require 'connect.php';

$daten = [
  'valid' => false,
  'status' => ''
];

$username = !empty($_POST['username']) ? trim($_POST['username']) : null;
$passwordAttempt = !empty($_POST['password']) ? trim($_POST['password']) : null;

$sql = "SELECT id, username, password, station, status, region, extstat FROM benutzer WHERE username = ?";
$stmt = $conn->prepare($sql);

$stmt->execute(array($username));

$user = $stmt->fetch(PDO::FETCH_ASSOC);

$validPassword = password_verify($passwordAttempt, $user['password']);

if ($validPassword) {
  $_SESSION['userid'] = $user['id'];
  $_SESSION['station'] = $user['station'];
  $_SESSION['initStation'] = $user['station'];
  $_SESSION['status'] = $user['status'];
  $_SESSION['region'] = $user['region'];
  $_SESSION['extstat'] = $user['extstat'];

  $daten['valid'] = true;
  $daten['status'] = $user['status'];
}

echo json_encode($daten);

$conn = null;
