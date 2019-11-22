<?php
require '../req/session.php';
require '../req/connect.php';

$stmt = $conn->prepare("DELETE FROM aushilfen WHERE id = ?");

$stmt->execute(array($_POST['id']));

$conn = null;
