<html lang="de">
<head>
  <title><?php echo $titel; ?></title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/png" href="../img/favicon.png">
  <link rel="stylesheet" href="../css/bootstrap.css">
  <link rel="stylesheet" href="../css/jquery.auto-complete.css">
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
<header class="noPrint header d-flex flex-nowrap justify-content-between align-items-center">
  <img src="../img/logo_starcar2x.png" alt="SC_Logo" width="276" height="53">
  <div class="display-1 text-center"><?php echo $titel; ?></div>
  <div class="dropdown">
    <img src="../img/menu.svg" class="dropdown-toggle" width="30" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="btnDD">
    <div class="dropdown-menu dropdown-menu-right" aria-lab>
      <a class="dropdown-item" href="../eintragen/index.php">Eintragen</a>
      <a class="dropdown-item" href="../auswerten/index.php">Arbeitszeitnachweis</a>
      <a class="dropdown-item priv disabled" href="../abrechnung/index.php">Abrechnung</a>
      <a class="dropdown-item priv disabled" href="../aushilfen/index.php">Aushilfen</a>
      <a class="dropdown-item priv disabled" href="../mitarbeiter/index.php">Mitarbeiter</a>
      <a class="dropdown-item" href="../admin/index.php" id="admin" style="display:none">Admin</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="../scripts/logout.php">Abmelden</a>
    </div>
  </div>
</header>
<main class="main">
<div class="alert alert-danger" role="alert" id="fehlerAlert">
  <span id="fehlerText"></span>
  <button type="button" id="fehlerClose" class="close" aria-label="Close">&times;</button>
</div>
<div class="alert alert-info" role="alert" id="infoAlert">
  <span id="infoText"></span>
  <button type="button" id="infoClose" class="close" aria-label="Close">&times;</button>
</div>
