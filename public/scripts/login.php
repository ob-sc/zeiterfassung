<?php
session_start();
require 'connect.php';

$username = !empty($_POST['username']) ? trim($_POST['username']) : null;
$passwordAttempt = !empty($_POST['password']) ? trim($_POST['password']) : null;

$sql = "SELECT id, username, password, station, status FROM benutzer WHERE username = ?";
$stmt = $conn->prepare($sql);

$stmt->execute(array($username));

$user = $stmt->fetch(PDO::FETCH_ASSOC);

$loginerror = 'Location: ../index.html#loginerror';

if ($user === false) {
  header($loginerror);
  exit;
}

$validPassword = password_verify($passwordAttempt, $user['password']);

if ($validPassword) {
  $_SESSION['userid'] = $user['id'];
  $_SESSION['station'] = $user['station'];
  $_SESSION['status'] = $user['status'];
  $_SESSION['aktiv'] = time();

  header('Location: ../eintragen/');
  exit;
}

header($loginerror);
exit;

$conn = null;
