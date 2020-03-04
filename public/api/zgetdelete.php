<?php
require '../scripts/connect.php';

/* 
 * id = id von req tabelle
 * zeitid = id in zeiten aus req
 * user = wer hat req geschickt
 * station = in welcher station ist req
 * req_reg = wann wurde req geschickt
 * name = name der AH von zeit
 * datum = datum der zeit
 * beginn = beginn zeit
 * ende = ende zeit
 * arbeitszeit = az zeit
 * gehalt = gehalt zeit
 * disponent = wer hat zeit eingetragen
 * zeit_reg = wann wurde zeit eingetragen
 */


$region = $_POST['regionStationen'];
$result = [];

foreach ($region as $v) {
  $stmt = $conn->prepare("SELECT id, zeitid, user, station, reg_date AS req_reg FROM reqdelete WHERE station = :station");
  $stmt->bindValue(':station', $v);
  $stmt->execute();

  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    // result füllen mit request daten aus tabelle reqdelete
    $result[$row['id']] = $row;

    // stmt2 disponent request
    $stmt2 = $conn->prepare("SELECT username FROM benutzer WHERE id = :id");
    $stmt2->bindValue(':id', $row['user']);
    $stmt2->execute();

    $requser = $stmt2->fetch(PDO::FETCH_ASSOC);
    $result[$row['id']]['user'] = $requser['username'];
    
    // stmt3 zeit
    $stmt3 = $conn->prepare("SELECT name, datum, beginn, ende, arbeitszeit, gehalt, disponent, reg_date AS zeit_reg FROM zeiten WHERE id = :id");
    $stmt3->bindValue(':id', $row['zeitid']);
    $stmt3->execute();

    $zeit = $stmt3->fetch(PDO::FETCH_ASSOC);
    foreach ($zeit as $key => $value) {
      $result[$row['id']][$key] = $value;
    }

    // stmt4 disponent zeit
    $stmt4 = $conn->prepare("SELECT username FROM benutzer WHERE id = :id");
    $stmt4->bindValue(':id', $zeit['disponent']);
    $stmt4->execute();

    $disp = $stmt4->fetch(PDO::FETCH_ASSOC);
    $result[$row['id']]['disponent'] = $disp['username'];
  }
}

echo json_encode($result);

$conn = null;
