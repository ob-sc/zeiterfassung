<?php
session_start();

if(isset($_SESSION['aktiv'])){
    $sekInaktiv = time() - $_SESSION['aktiv'];
    // in sekunden, 3 Min (180)
    $expireNach = 180;
    if($_SESSION['devmode'] == 1) $expireNach = 999999999;
    if($sekInaktiv >= $expireNach){
        session_unset();
        session_destroy();
        die("<script type='text/javascript'>window.location.href='../index.html#expire';</script>");
    }
}

if($_SESSION['status'] == 'neu') {
    die("<script type='text/javascript'>window.location.href='../index.html#neu';</script>");
}

$_SESSION['aktiv'] = time();
