<?php
require '../req/session.php';
require '../req/connect.php';

$id = $_POST['id'];

$sql = "UPDATE benutzer SET status = null WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->execute(array($id));

$conn = null;
