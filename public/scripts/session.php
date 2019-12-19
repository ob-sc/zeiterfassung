<?php
session_start();

// Rückgabe vorbereiten
$daten = [
  'status' => 'valid',
  'timestamp' => '',
  'userStatus' => $_SESSION['status'],
  'stationID' => $_SESSION['station']
];

// wenn aus js setTime kommt -> session aktiv jetzt setzen
if (isset($_POST['setTime'])) $_SESSION['aktiv'] = time();

if (!isset($_SESSION['aktiv'])) {
  $daten = [
    'status' => 'invalid',
    'userStatus' => '',
    'stationID' => ''
  ];
}

// session zeit berechnen
$sekInaktiv = time() - $_SESSION['aktiv'];

$daten['timestamp'] = $sekInaktiv;

// in sekunden, 10 Min (6000)
$expireNach = 6000;

// wenn admin dann 86400 (24 h) session
if ($_SESSION['status'] === 'admin') $expireNach = 86400;

// test todo kurz
$expireNach = 70;

// prüfen ob session abgelaufen ist -> return #expire
if ($sekInaktiv >= $expireNach) {
  session_unset();
  session_destroy();
  
  $daten = [
    'status' => 'invalid',
    'userStatus' => '',
    'stationID' => ''
  ];
}

echo json_encode($daten);
