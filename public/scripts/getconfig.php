<?php

// Rückgabe vorbereiten
$daten = [
  'status' => 'OK',
  'daten' => [],
  'meldung' => '',
];

// Pfad setzen
$iniFile = __DIR__ . '/../../config.ini';

// prüfen ob existiert und lesbar
if (!file_exists($iniFile) || !is_readable($iniFile)) {
  $daten['status'] = 'ERROR';
  $daten['meldung'] = 'Konfigdatei nicht vorhanden oder nicht lesbar';
  die(json_encode($daten));
}

// Datei parsen
$config = parse_ini_file($iniFile, true);

if ($config === false) {
  $daten['status'] = 'ERROR';
  $daten['meldung'] = 'Konfigdatei nicht parsbar';
  die(json_encode($daten));
}

// Sicherheit: sql-Daten entfernen
unset($config['sql']);

// devmode
if ($config['settings']['devmode'] == 1) {
  $daten['status'] = 'DEV';
  $daten['meldung'] = 'devmode';
}

// Rückgabe der Konfig
$daten['daten'] = $config;
echo json_encode($daten);
