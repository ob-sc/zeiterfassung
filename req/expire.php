<?php
session_start();

if(isset($_SESSION['aktiv'])){
    $sekInaktiv = time() - $_SESSION['aktiv'];
    // in sekunden, 3 Min (180)
    $expireNach = 1800000;
    if($sekInaktiv >= $expireNach){
        session_unset();
        session_destroy();
        die("<script type='text/javascript'>window.location.href='../index.php#expire';</script>");
    }
}

$_SESSION['aktiv'] = time();
?>