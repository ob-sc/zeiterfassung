<?php
session_start();
require '../req/connect.php';

/* nur mit starcar mail anmelden
-> username: if username == "@starcar.de" dann fehler
-> string zerstückeln bei @ (wenn @ existiert), dann gucken ob dahinter @starcar.de steht
überprüfen ob pw1 = pw2

check ob email existiert?

status station

passwort vergessen
*/

$username = !empty($_POST['username']) ? trim($_POST['username']) : null;
$pass = !empty($_POST['password']) ? trim($_POST['password']) : null;

$sql = "SELECT COUNT(username) AS num FROM benutzer WHERE username = ?";
$stmt = $conn->prepare($sql);

$stmt->execute(array($username));

$row = $stmt->fetch(PDO::FETCH_ASSOC);

if($row['num'] > 0){
    die("<script type='text/javascript'>window.location.href='../register.html#regerror';</script>");
}

$passwordHash = password_hash($pass, PASSWORD_DEFAULT);

$sql = "INSERT INTO benutzer (username, password) VALUES (:username, :password)";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':username', $username);
$stmt->bindValue(':password', $passwordHash);

$result = $stmt->execute();

if($result){
    die("<script type='text/javascript'>window.location.href='../register.html#regsuccess';</script>");
}

$conn = null;
