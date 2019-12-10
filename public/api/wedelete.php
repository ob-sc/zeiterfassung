<?php
require '../scripts/connect.php';

$stmt = $conn->prepare("DELETE FROM wochenende WHERE id = ?");

$stmt->execute(array($_POST['id']));

$conn = null;
