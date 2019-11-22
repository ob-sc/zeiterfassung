<?php
require '../req/session.php';
require '../req/connect.php';

$sql = "DELETE FROM zeiten WHERE id = :id";

$stmt = $conn->prepare($sql);

$stmt->bindValue(':id', $_POST['id']);

$stmt->execute();

$conn = null;
