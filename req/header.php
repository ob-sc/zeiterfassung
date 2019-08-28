<html lang="de">
<head>
    <title>Zeiterfassung Aushilfen</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/jquery.auto-complete.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <script src="../js/moment.js"></script>
    <script src="../js/main.js"></script>
    <script src="../js/jquery.auto-complete.js"></script>
</head>
<body>
<div>
    <img src="../img/menu.svg" class="float-right dropdown-toggle noPrint" width="30" id="btnDD" data-toggle="dropdown">
    <div class="dropdown-menu" aria-labelledby="btnDD">
        <a class="dropdown-item" href="../eintragen/index.php">Eintragen</a>
        <a class="dropdown-item" href="../auswerten/index.php">Auswerten</a>
        <a class="dropdown-item" href="../abrechnung/index.php">Abrechnung</a>
        <a class="dropdown-item" href="../bearbeiten/index.php">Aushilfen</a>
        <a class="dropdown-item" href="../scripts/logout.php">
            <img src="../img/logout.svg" width="16"> Abmelden
        </a>
        <select class="dropdown-item" id="stationSelect">
            <option value="osdorf">Osdorf</option>
            <option value="billsted">Billstedt</option>
        </select>
        <script>
        $('#stationSelect').change(function(){
            $.ajax({
                url: '../scripts/admin.php',
                method: 'POST',
                dataType: 'json',
                data: { station: $("#stationSelect").val(); }
            })
            .always(function(data){
                console.log(data)
            })
        });
        $(document).ready(function(){
            if (status == 'admin') {
                $('#stationSelect').show();
            }
        })
        </script>
    </div>
</div>
<div class="jumbotron p-4" style="">
    <img src="../img/logo_starcar2x.png" alt="SC_Logo" width="276" height="53">
    <h1 style="font-weight:bolder">Zeiterfassung Aushilfen</h1>
</div>
