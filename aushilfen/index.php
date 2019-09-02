<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div id="anlegenContainer">
    <form method="post" id="newform" autocomplete="off">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" placeholder="Name" name="name" id="anlegenName" required>
        </div>
        <div class="form-group">
            <label for="name">Personalnummer:</label>
            <input type="number" class="form-control" placeholder="Personalnummer" name="personalnr" id="anlegenPN">
        </div>
        <div class="form-group">
            <label for="norlohn">Lohn Wochentag:</label>
            <input type="number" class="form-control" name="norlohn" id="anlegenNor" min="9.19" step="0.01" max="100" value="9.19">
            <label for="samlohn">Lohn Samstag:</label>
            <input type="number" class="form-control" name="samlohn" id="anlegenSam" min="9.19" step="0.01" max="100" value="10.00">
            <label for="sonlohn">Lohn Sonntag:</label>
            <input type="number" class="form-control" name="sonlohn" id="anlegenSon" min="9.19" step="0.01" max="100" value="11.00">
        </div>
        <input type="submit" class="btn scc mt-2" value="Anlegen">
        <input type="button" class="btn scc mt-2" value="Zurück" onclick="location.reload();">
    </form>
</div>

<div class="container-fluid" id="bearbeitenContainer">
    <table class="table table-hover table-sm" style="width:100%;margin:auto;">
    <caption>Löhne mit Punkt statt Komma eintragen!</caption>
        <thead>
            <tr>
                <th width="8%">PN</th>
                <th width="54%">Name</th>
                <th width="12%">Lohn Wochentag</th>
                <th width="12%">Lohn Samstag</th>
                <th width="12%">Lohn Sonntag</th>
                <th width="2%">&nbsp</th>
            </tr>
        </thead>
        <tbody id="ahTab">
        </tbody>
    </table>
    <input type="button" class="btn scc mt-2" value="Neu anlegen" onclick="$('#anlegenContainer').show();$('#bearbeitenContainer').hide()">
</div>

<?php
include "../req/footer.php";
?>
