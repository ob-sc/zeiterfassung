<?php
require '../scripts/session.php';
require '../scripts/connect.php';

$stmt = $conn->prepare("DELETE FROM aushilfen WHERE id = ?");

$stmt->execute(array($_POST['id']));

$conn = null;
