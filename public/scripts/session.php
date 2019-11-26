<?php
session_start();

// Rückgabe vorbereiten
$daten = [
  'status' => 'OK',
  'code' => '',
  'meldung' => '',
  'userStatus' => $_SESSION['status']
];

// session zeit berechnen
$sekInaktiv = time() - $_SESSION['aktiv'];
// in sekunden, 10 Min (6000)
$expireNach = 6000;

// wenn admin dann 86400 (24 h) session
if ($_SESSION['status'] === 'admin') $expireNach = 86400;

// prüfen ob status neu ist -> return #neu
if ($_SESSION['status'] === 'neu') {
  $daten['status'] = 'ERROR';
  $daten['code'] = 0;
  $daten['meldung'] = 'Benutzer ist neu';
  die(json_encode($daten));
}

// prüfen ob session variable existiert -> return #expire
if (!isset($_SESSION['aktiv'])) {
  $daten['status'] = 'ERROR';
  $daten['code'] = 1;
  $daten['meldung'] = 'Session ist nicht aktiv';
  die(json_encode($daten));
}

// prüfen ob session abgelaufen ist -> return #expire
if ($sekInaktiv >= $expireNach) {
  session_unset();
  session_destroy();
  $daten['status'] = 'ERROR';
  $daten['code'] = 2;
  $daten['meldung'] = 'Session ist abgelaufen';
  die(json_encode($daten));
}

// sonst wenn alles ok
$daten['status'] = 'OK';
$daten['code'] = 3;
$daten['meldung'] = 'Session ist aktiv';

$_SESSION['aktiv'] = time();

echo json_encode($daten);
