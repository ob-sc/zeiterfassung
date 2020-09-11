<?php
require '../scripts/connect.php';

if ($_POST['mode'] == 1) {
  $stmt = $conn->prepare("DELETE FROM zeiten WHERE id = ?");
  $stmt->execute(array($_POST['id']));
}

if ($_POST['mode'] == 2) {
  $stmt = $conn->prepare("DELETE FROM reqdelete WHERE zeitid = ?");
  $stmt->execute(array($_POST['id']));
}

if ($_POST['mode'] == 3) {
  $stmt = $conn->prepare("DELETE FROM zeiten WHERE id = ?");
  $stmt->execute(array($_POST['id']));
  
  $stmt = $conn->prepare("DELETE FROM reqdelete WHERE zeitid = ?");
  $stmt->execute(array($_POST['id']));
}

$conn = null;
