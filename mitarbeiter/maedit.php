<?php
require '../req/session.php';
require '../req/connect.php';

$maid = $_POST['maid'];

echo $maid;

$sql = "UPDATE benutzer SET status = null WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->execute(array($_POST['maid']));

$conn = null;
