<?php
if (isset($_POST['newStation'])) {
  session_start();
  $_SESSION['station'] = $_POST['newStation'];
  exit($_SESSION['station']);
}
