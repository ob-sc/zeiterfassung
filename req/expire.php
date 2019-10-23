<?php
session_start();

if (isset($_SESSION['aktiv'])) {
  $sekInaktiv = time() - $_SESSION['aktiv'];
  // in sekunden, 10 Min (6000)
  $expireNach = 6000;
  if ($sekInaktiv >= $expireNach) {
    session_unset();
    session_destroy();
    die("<script type='text/javascript'>window.location.href='../index.html#expire';</script>");
  }
}

if ($_SESSION['status'] == 'neu') {
  die("<script type='text/javascript'>window.location.href='../index.html#neu';</script>");
}

$_SESSION['aktiv'] = time();
