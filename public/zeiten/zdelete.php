<?php
require '../req/session.php';
require '../req/connect.php';

$stmt = $conn->prepare("DELETE FROM zeiten WHERE id = ?");

$stmt->execute(array($_POST['id']));

$conn = null;
