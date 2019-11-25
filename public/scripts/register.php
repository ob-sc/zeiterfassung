<?php
session_start();
require 'connect.php';

/*
status muss admin ändern?

passwort vergessen

sl muss accounts überprüfen und sagen wer account machen darf
*/

$username = !empty($_POST['username']) ? trim($_POST['username']) : null;
$password = !empty($_POST['password1']) ? trim($_POST['password1']) : null;
$passCheck = !empty($_POST['password2']) ? trim($_POST['password2']) : null;

$username = strtolower($username);

// Check ob es benutzer schon gibt
$sql = "SELECT COUNT(username) AS num FROM benutzer WHERE username = ?";
$stmt = $conn->prepare($sql);

$stmt->execute(array($username));

$row = $stmt->fetch(PDO::FETCH_ASSOC);

if($row['num'] > 0){
  die("<script type='text/javascript'>window.location.href='../register.html#exists';</script>");
}

// hash & eintragen
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO benutzer (username, password, station, status) VALUES (:username, :password, :station, :status)";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':username', $username);
$stmt->bindValue(':password', $passwordHash);
$stmt->bindValue(':station', $_POST['station']);
$stmt->bindValue(':status', 'neu');

$result = $stmt->execute();

// erfolg
if($result){
  die("<script type='text/javascript'>window.location.href='../register.html#regsuccess';</script>");
}

$conn = null; 
