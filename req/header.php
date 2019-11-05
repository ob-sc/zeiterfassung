<!DOCTYPE html>
<html lang="de">
<head>
  <title><?php echo $titel; ?></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" href="../img/favicon.png">
  <link rel="stylesheet" href="../css/bootstrap.css">
  <link rel="stylesheet" href="../css/jquery.auto-complete.css">
  <link rel="stylesheet" href="../css/navbar.css">
  <link rel="stylesheet" href="../css/main.css">
  <script src="../js/jquery-3.4.1.js"></script>
  <script src="../js/bootstrap.bundle.js"></script>
  <script src="../js/moment.js"></script>
  <script src="../js/jquery.auto-complete.js"></script>
  <script src="../js/jspdf.js"></script>
  <script src="../js/jspdf.plugin.autotable.js"></script>
  <script src="../js/main.js"></script>
</head>
<body>
<header class="noPrint">
  <div class="logowrapper">
    <img src="../img/logo_starcar2x.png" alt="SC_Logo" class="logo">
  </div>
  <div class="display-1 text-center"><?php echo $titel; ?></div>
</header>
<nav>
    <ul class="cnav">
      <li><a id="eintragen" href="../eintragen/index.php">Eintragen</a></li>
      <li><a id="auswerten" href="../auswerten/index.php">Arbeitszeitnachweis</a></li>
      <li class="slmenu" style="display:none"><a id="abrechnung" href="../abrechnung/index.php">Abrechnung</a></li>
      <li class="slmenu" style="display:none"><a id="aushilfen" href="../aushilfen/index.php">Aushilfen</a></li>
      <li class="slmenu" style="display:none"><a id="mitarbeiter" href="../mitarbeiter/index.php">Mitarbeiter</a></li>
      <li id="adminmenu" style="display:none"><a id="adminnav" href="../admin/index.php">Admin</a></li>
      <li><a id="readme" href="../doc/readme.php">Hilfe</a></li>
      <li><a class="logout" href="../scripts/logout.php">Abmelden</a></li>
    </ul>
  </nav>
<main class="main">
<div class="alert alert-danger" role="alert" id="fehlerAlert">
  <span id="fehlerText"></span>
  <button type="button" id="fehlerClose" class="close" aria-label="Close">&times;</button>
</div>
<div class="alert alert-info" role="alert" id="infoAlert">
  <span id="infoText"></span>
  <button type="button" id="infoClose" class="close" aria-label="Close">&times;</button>
</div>
