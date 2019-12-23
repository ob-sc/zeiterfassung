<?php 
require '../scripts/connect.php';

if (isset($_POST['anmeldeData'])) {
  $anmeldenSQL = "INSERT INTO angemeldet (name, station, datum, beginn) VALUES (:name, :station, :datum, :beginn)";

  $stmt = $conn->prepare($anmeldenSQL);

  $stmt->bindValue(':name', $_POST['anmeldeData']['ahName']);
  $stmt->bindValue(':station', $_SESSION['station']);
  $stmt->bindValue(':datum', $_POST['anmeldeData']['datum']);
  $stmt->bindValue(':beginn', $_POST['anmeldeData']['beginnForm']);

  $stmt->execute();
}

if (isset($_POST['deleteid'])) {
  $abmeldenSQL = "DELETE FROM angemeldet WHERE id = ?";

  $stmt = $conn->prepare($abmeldenSQL);

  $stmt->execute(array($_POST['deleteid']));
}

$angemeldetSQL = "SELECT id, name, datum, beginn FROM angemeldet WHERE station = ? AND datum = CURDATE()"; 

$stmt = $conn->prepare($angemeldetSQL);

$stmt->execute(array($_SESSION['station']));

$angemeldet = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($angemeldet);

$conn = null; 
