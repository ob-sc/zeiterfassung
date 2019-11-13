<!DOCTYPE html>
<html lang="de">
<head>
  <title><?php echo $titel; ?></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" href="../img/favicon.png">
  <link rel="stylesheet" href="../css/bootstrap.min.css">
  <link rel="stylesheet" href="../css/main.css">
  <script src="../js/jquery-3.4.1.min.js"></script>
  <script src="../js/bootstrap.bundle.min.js"></script>
  <script src="../js/main.js"></script>
</head>
<body>
<header class="noPrint">
  <img src="../img/logo_starcar2x.png" alt="SC_Logo" class="logo">
  <div class="pagetitle"><?php echo $titel; ?></div>
</header>
<nav class="noPrint">
    <ul class="cnav">
      <li><a id="eintragen" href="../eintragen/index.php">Eintragen</a></li>
      <li><a id="auswerten" href="../auswerten/index.php">Auswerten</a></li>
      <li class="slmenu" style="display:none"><a id="abrechnung" href="../abrechnung/index.php">Abrechnung</a></li>
      <li class="slmenu" style="display:none"><a id="aushilfen" href="../aushilfen/index.php">Aushilfen</a></li>
      <li class="slmenu" style="display:none"><a id="mitarbeiter" href="../mitarbeiter/index.php">Mitarbeiter</a></li>
      <li id="adminmenu" style="display:none"><a id="adminnav" href="../admin/index.php">Admin</a></li>
      <li><a id="readme" href="../doc/readme.php">Hilfe</a></li>
      <li><a class="logout" href="../scripts/logout.php">Abmelden</a></li>
    </ul>
  </nav>
<main>
<div class="alert alert-danger" role="alert" id="fehlerAlert">
  <span id="fehlerText"></span>
  <button type="button" id="fehlerClose" class="close" aria-label="Close">&times;</button>
</div>
<div class="alert alert-info" role="alert" id="infoAlert">
  <span id="infoText"></span>
  <button type="button" id="infoClose" class="close" aria-label="Close">&times;</button>
</div>
