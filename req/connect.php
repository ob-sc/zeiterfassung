<?php

$iniFile = __DIR__ . '/../config.ini';

if(!file_exists($iniFile) || !is_readable($iniFile)) {
    die('<h4>config.ini existiert nicht oder ist nicht lesbar</h4>');
}

$config = parse_ini_file($iniFile, true);

if($config === false) {
    die('<h4>Fehler bei Konfiguration - parse</h4>');
}

if(
    $config['sql']['servername'] == ''
    || $config['sql']['username'] == ''
    || $config['sql']['password'] == ''
    || $config['sql']['dbname'] == ''
) {
    die('<h4>Fehler bei Konfiguration - leer</h4>');
}

try {
    $conn = new PDO('mysql:host='.$config['sql']['servername'].';dbname='.$config['sql']['dbname'].';charset=utf8mb4', $config['sql']['username'], $config['sql']['password']);
    $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(Exception $e) {
    die('<h4>Fehler bei Konfiguration - PDO</h4>');
}
