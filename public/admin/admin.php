<?php
session_start();
$_SESSION['station'] = $_POST['newStation'];

echo($_SESSION['station']);
