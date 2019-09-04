<?php
session_start();
require 'req/connect.php';
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <title>Zeiterfassung Aushilfen</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</head>

<body>
<div class="jumbotron p-4" style="background:#f3f3f3;">
    <img src="/img/logo_starcar2x.png" alt="SC_Logo" width="276" height="53"/>
    <h1 style="font-weight:bolder">Zeiterfassung Aushilfen</h1>
</div>

<div class="container">
    <div class="alert alert-danger alert-dismissible" role="alert" id="expAlert" style="display:none;">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        Sitzung abgelaufen, bitte neu anmelden!
    </div>
</div>

<div class="container m-4">
    <form action="index.php" method="post">
        <div class="form-group col-md-4">
            <label for="username" class="m-1">Benutzername:</label>
            <input type="text" class="form-control m-1" placeholder="Benutzername" name="username" autocomplete="off" required>
        </div>
        <div class="form-group col-md-4">
            <label for="password">Passwort:</label>
            <input type="password" class="form-control m-1" placeholder="Passwort" name="password" required>
        </div>
        <button type="submit" name="login" class="btn m-1" style="background: #feed01">Senden</button>
    </form>
</div>
</body>
</html>
<?php
if (isset($_POST['login'])) {
    
    $username = !empty($_POST['username']) ? trim($_POST['username']) : null;
    $passwordAttempt = !empty($_POST['password']) ? trim($_POST['password']) : null;
    
    $sql = "SELECT id, username, password, station, status FROM benutzer WHERE username = :username";
    $stmt = $conn->prepare($sql);
    
    $stmt->bindValue(':username', $username);

    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user === false) {
        die("<div class=\"container\"><div class=\"alert alert-danger text-center\" role=\"alert\">Benutzername / Passwort falsch!</div></div>");
    } else {
        $validPassword = password_verify($passwordAttempt, $user['password']);
        if ($validPassword) {
            $_SESSION['station'] = $user['station'];
            $_SESSION['status'] = $user['status'];
            $_SESSION['aktiv'] = time();

            header("Location: eintragen/index.php");
            exit;
        } else {
            die("<div class=\"container\"><div class=\"alert alert-danger text-center\" role=\"alert\">Benutzername / Passwort falsch!</div></div>");
        }
    }
}
$conn = null;
