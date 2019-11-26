<?php
require '../scripts/connect.php';

$sql = "UPDATE benutzer SET status = null WHERE id = ?";

$stmt = $conn->prepare($sql);

$stmt->execute(array($_POST['id']));

$conn = null;
