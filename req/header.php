<html lang="de">
<head>
    <title>Zeiterfassung Aushilfen</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="../css/bootstrap.css">
    <link rel="stylesheet" href="../css/jquery.auto-complete.css">
    <link rel="stylesheet" href="../css/main.css">
    <script src="../js/jquery-3.4.1.js"></script>
    <script src="../js/bootstrap.bundle.js"></script>
    <script src="../js/moment.js"></script>
    <script src="../js/jquery.auto-complete.js"></script>
    <script src="../js/main.js"></script>
</head>
<body>
<header>
    <div class="dropdown">
        <img src="../img/menu.svg" class="dropdown-toggle noPrint" width="30" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="btnDD">
        <div class="dropdown-menu dropdown-menu-right" aria-lab>
            <a class="dropdown-item" href="../eintragen/index.php">Eintragen</a>
            <a class="dropdown-item" href="../auswerten/index.php">Arbeitszeitnachweis</a>
            <a class="dropdown-item priv disabled" href="../abrechnung/index.php">Abrechnung</a>
            <a class="dropdown-item priv disabled" href="../aushilfen/index.php">Aushilfen</a>
            <a class="dropdown-item" href="../admin/index.php" id="admin" style="display:none">Admin</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="../scripts/logout.php">Abmelden</a>
        </div>
    </div>
    <div>
        <img src="../img/logo_starcar2x.png" alt="SC_Logo" width="276" height="53">
        <h2 style="font-weight:bolder">Zeiterfassung Aushilfen</h2>
    </div>
</header>
<main>
<div class="container">
    <div class="alert alert-danger alert-dismissible" role="alert" id="fehlerAlert" style="display:none;">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <div id="fehlerText"></div>
    </div>
</div>
<div class="container">
    <div class="alert alert-info alert-dismissible" role="alert" id="infoAlert" style="display:none;">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <div id="infoText"></div>
    </div>
</div>
