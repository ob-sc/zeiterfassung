<?php 
require '../scripts/connect.php';

if (isset($_POST['signInData'])) {
  $stmt = $conn->prepare("INSERT INTO angemeldet (name, ahid, station, date, start) VALUES (:name, :ahid, :station, :date, :start)");

  $stmt->bindValue(':name', $_POST['signInData']['name']);
  $stmt->bindValue(':ahid', $_POST['signInData']['id']);
  $stmt->bindValue(':station', $_SESSION['station']);
  $stmt->bindValue(':date', $_POST['signInData']['date']);
  $stmt->bindValue(':start', $_POST['signInData']['start']);

  $stmt->execute();
}

if (isset($_POST['deleteid'])) {
  $stmt = $conn->prepare("DELETE FROM angemeldet WHERE id = ?");
  $stmt->execute(array($_POST['deleteid']));
}

$stmt = $conn->prepare("SELECT id, name, ahid, date, start FROM angemeldet WHERE station = ? ORDER BY date, start ASC");
$stmt->execute(array($_SESSION['station']));

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

$conn = null; 
