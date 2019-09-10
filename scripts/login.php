<?php
session_start();
require '../req/connect.php';

$username = !empty($_POST['username']) ? trim($_POST['username']) : null;
$passwordAttempt = !empty($_POST['password']) ? trim($_POST['password']) : null;

$sql = "SELECT id, username, password, station, status FROM benutzer WHERE username = ?";
$stmt = $conn->prepare($sql);

$stmt->execute(array($username));

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user === false) {
    die("<script type='text/javascript'>window.location.href='../index.html#loginerror';</script>");
} else {
    $validPassword = password_verify($passwordAttempt, $user['password']);
    if ($validPassword) {
        $_SESSION['userid'] = $user['id'];
        $_SESSION['station'] = $user['station'];
        $_SESSION['status'] = $user['status'];
        $_SESSION['devmode'] = 0;
        $_SESSION['aktiv'] = time();

        header("Location: ../eintragen/index.php");
        exit;
    } else {
        die("<script type='text/javascript'>window.location.href='../index.html#loginerror';</script>");
    }
}

$conn = null;
