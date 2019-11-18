<?php
require '../req/session.php';
require '../req/connect.php';

$sql = "DELETE FROM benutzer WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->execute(array($_POST['id']));

$conn = null;
