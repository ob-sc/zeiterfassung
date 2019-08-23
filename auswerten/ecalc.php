<?php
require '../req/expire.php';
require '../req/connect.php';

// Station
$station = $_SESSION['station'];
// Name Aushilfe
$name = $_POST['name'];
// Monat + Jahr Selektor
$monjahr = $_POST['monat'];
$mons = substr($monjahr, 5, 2);
$jahr = substr($monjahr, 0, 4);

// überschrift / evtl als datumsobjekt?
$monarr = ["", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
$monat = $monarr[(int)$mons];

$sql = "CREATE TEMPORARY TABLE IF NOT EXISTS etemp (
    id int NOT NULL AUTO_INCREMENT,
    beginn varchar(5) DEFAULT NULL,
    ende varchar(5) DEFAULT NULL,
    stunden varchar(6) DEFAULT NULL,
    gehalt varchar(8) DEFAULT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";

$conn->exec($sql);

$sql = "CREATE TEMPORARY TABLE IF NOT EXISTS esonder (
    tag int NOT NULL,
    beginn varchar(5) DEFAULT NULL,
    ende varchar(5) DEFAULT NULL,
    stunden varchar(6) DEFAULT NULL,
    gehalt varchar(8) DEFAULT NULL,
    PRIMARY KEY (tag)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";

$conn->exec($sql);



// array mit allen eingetragenen zeiten im ausgewählten monat für eingegebenen namen [mit station]
$sql = "SELECT datum, beginn, ende, arbeitszeit, lohn FROM arbeitszeit WHERE name = :name AND MONTH(datum) = :monat AND station = :station ORDER BY datum ASC, beginn ASC";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $name);
$stmt->bindValue(':monat', $mons);
$stmt->bindValue(':station', $station);

$stmt->execute();

$ea = $stmt->fetchAll(PDO::FETCH_ASSOC);

$mont = cal_days_in_month(CAL_GREGORIAN, $mons, $jahr);

$cea = count($ea);

// tage im monat -> später variable jahr [GEHT NICHT BEI value = 0 für ganzes jahr -> if ($mons != 0) einbauen]
foreach ($ea as $row) {
    $taa = substr($row['datum'], 0, 2);
}

for ($i = 0; $i < $cea; $i++) {
    $taa = substr($ea[$i]['datum'], 0, 2);
    $ea[$i]['tag'] = (int)$taa;
}

$sql = "INSERT INTO etemp (beginn, ende, stunden, gehalt) VALUES (null, null, null, null)";
$stmt = $conn->prepare($sql);


for ($i = 1; $i <= $mont; $i++) {
    $stmt->execute();
}

$sql = "UPDATE etemp SET beginn = :beginn, ende = :ende, stunden = :stunden, gehalt = :gehalt WHERE id = :tag";
$stmt = $conn->prepare($sql);

$stmt->bindParam("beginn", $pb);
$stmt->bindParam("ende", $pe);
$stmt->bindParam("stunden", $ps);
$stmt->bindParam("gehalt", $pg);
$stmt->bindParam("tag", $pt);

$sql = "INSERT INTO esonder (tag, beginn, ende, stunden, gehalt) VALUES (:tag, :beginn, :ende, :stunden, :gehalt)";
$stmt2 = $conn->prepare($sql);

$stmt2->bindParam("beginn", $pb);
$stmt2->bindParam("ende", $pe);
$stmt2->bindParam("stunden", $ps);
$stmt2->bindParam("gehalt", $pg);
$stmt2->bindParam("tag", $pt);

$pte = 0;
foreach ($ea as $row) {
    $pb = $row['beginn'];
    $pe = $row['ende'];
    $ps = $row['arbeitszeit'];
    $pg = "{$row['lohn']} €";
    $pt = $row['tag'];
    if ($pt != $pte) {
        $stmt->execute();
    } else {
        $stmt2->execute();
    }
    $pte = $pt;
}

// printOnly geht nicht?
echo "<h1 style=\"text-align:center\">Zeiten {$name}, {$monat} {$jahr}, {$station}</h1>"; 
echo "<div class='container'><table style='border: solid 1px black;width: 100%'>";
echo "<tr><th width=\"20%\">Tag</th><th width=\"20%\">Beginn</th><th width=\"20%\">Ende</th><th width=\"20%\">Stunden</th><th width=\"20%\">Gehalt</th></tr>";

class TableRows extends RecursiveIteratorIterator { 
    function __construct($it) { 
        parent::__construct($it, self::LEAVES_ONLY); 
    }

    function current() {
        return "<td>" . parent::current(). "</td>";
    }

    function beginChildren() { 
        echo "<tr>"; 
    } 

    function endChildren() { 
        echo "</tr>" . "\n";
    } 
} 

$sql = "SELECT id, beginn, ende, stunden, gehalt FROM etemp";
$stmt = $conn->prepare($sql);

$stmt->execute();

$tab1 = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
foreach (new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
    echo $v;
}

echo "</table></div>";

echo "<h1 class=\"tab\" style=\"text-align:center\">Sondereinträge</h1>"; 
echo "<div class=\"container\" id=\"sonderTab\"><table style=\"width: 100%\">";
echo "<tr><th width=\"20%\">Tag</th><th width=\"20%\">Beginn</th><th width=\"20%\">Ende</th><th width=\"20%\">Stunden</th><th width=\"20%\">Gehalt</th></tr>";

$sql = "SELECT tag, beginn, ende, stunden, gehalt FROM esonder";
$stmt = $conn->prepare($sql);

$stmt->execute();

$tab2 = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
foreach (new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
    echo $v;
}

echo "</table></div>";

$count = $stmt->rowCount();

if ($count == 0) {
    echo "<script>$('#sonderTab').hide();</script>";
}


// Berechnung

$sql = "CREATE TEMPORARY TABLE calctemp (
    id int DEFAULT 1,
    gehalt varchar(6) DEFAULT NULL,
    stunden varchar(6) DEFAULT NULL,
    tage int DEFAULT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;";

$conn->exec($sql);

$sql = "SELECT arbeitszeit FROM arbeitszeit WHERE name = :name AND MONTH(datum) = :monat AND station = :station";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $name);
$stmt->bindValue(':monat', $mons);
$stmt->bindValue(':station', $station);

$stmt->execute();

$aa = $stmt->fetchAll(PDO::FETCH_ASSOC);

$s = 0;
$m = 0;
foreach ($aa as $row) {
    $az =  new dateTime($row['arbeitszeit']);
    $st = $az->format('H');
    $mt = $az->format('i');
    $s += $st;
    $m += $mt;
}

while ($m > 60) {
    $s++;
    $m -= 60;
}

if (strlen($m) == 1) {
    $m .= 0;
}
$azm = "{$s}:{$m}";

$sql = "INSERT INTO calctemp (stunden) VALUES (:stunden) ON DUPLICATE KEY UPDATE stunden = VALUES(stunden)";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':stunden', $azm);

$stmt->execute();


// GEHALT


$sql = "SELECT lohn FROM arbeitszeit WHERE name = :name AND MONTH(datum) = :monat AND station = :station";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $name);
$stmt->bindValue(':monat', $mons);
$stmt->bindValue(':station', $station);

$stmt->execute();

$la = $stmt->fetchAll(PDO::FETCH_ASSOC);

$g = 0;
foreach ($la as $row) {
    $g += $row['lohn'];
}

$dec = stristr($g, ".");
$len = strlen($dec);
if ($dec != false && $len == 2) {
    $g .= "0";
} else if ($dec == false) {
    $g .= ".00";
}

$sql = "UPDATE calctemp SET gehalt = :gehalt WHERE id = 1";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':gehalt', $g);

$stmt->execute();


// Tage


$sql = "SELECT COUNT(DISTINCT datum) FROM arbeitszeit WHERE name = :name AND MONTH(datum) = :monat AND station = :station";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $name);
$stmt->bindValue(':monat', $mons);
$stmt->bindValue(':station', $station);

$stmt->execute();

$ta = $stmt->fetch(PDO::FETCH_ASSOC);

$tm = $ta['COUNT(DISTINCT datum)'];

$sql = "UPDATE calctemp SET tage = :tage WHERE id = 1";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':tage', $tm);

$stmt->execute();

// query? 
$sql = "SELECT stunden, gehalt, tage FROM calctemp";
$stmt = $conn->prepare($sql);

$stmt->execute();

// hier fetchColumn?
$ega = $stmt->fetch(PDO::FETCH_ASSOC);

echo "<div class=\"container mt-3\">";

echo "<strong>Gehalt:</strong> {$ega['gehalt']} €<br/>";
echo "<strong>Stunden:</strong> {$ega['stunden']}<br/>";
echo "<strong>Tage:</strong> {$ega['tage']}<br/>";

$gmn = $ega['gehalt'];
$gn = 450 - $gmn;

$sql = "SELECT norlohn FROM aushilfen WHERE name = :name";
$stmt = $conn->prepare($sql);

$stmt->bindValue(':name', $name);

$stmt->execute();

$ag = $stmt->fetch(PDO::FETCH_ASSOC);

$sn = floor($gn / $ag['norlohn']);

if ($gn > 0) {
    echo "<br/>Noch $sn Stunden bis 450€ (ohne Wochenende)<br/>";
} else {
    echo "<br/><strong>ACHTUNG: 450€ überschritten!</strong>";
}

echo "</div>";

echo "<div class=\"container mb-3\"><button onclick=\"window.print();\" class=\"btn scc mt-3 noPrint\">Drucken</button></div>";

$conn = null;
?>