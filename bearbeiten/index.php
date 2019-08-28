<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="container-fluid" id="anlegenContainer" style="margin:auto;display:none">
    <form method="post" id="newform" autocomplete="off">
        <div class="form-group col-xl-3">
            <label for="name" class="m-1">Name:</label>
            <input type="text" class="form-control m-1" placeholder="Name" name="name" id="anlegenName" required>
        </div>
        <div class="form-group col-xl-3">
            <label for="name" class="m-1">Personalnummer:</label>
            <input type="number" class="form-control m-1" placeholder="Personalnummer" name="personalnr" id="anlegenPN">
        </div>
        <div class="form-group col-xl-3">
            <label for="name" class="m-1">Löhne:</label>
            <input type="number" class="form-control m-1" placeholder="Wochentag" name="norlohn" id="anlegenNor" min="9.19" step="0.01" max="100" value="9.19">
            <input type="number" class="form-control m-1" placeholder="Samstag" name="samlohn" id="anlegenSam" min="9.19" step="0.01" max="100" value="10.00">
            <input type="number" class="form-control m-1" placeholder="Sonntag" name="sonlohn" id="anlegenSon" min="9.19" step="0.01" max="100" value="11.00">
        </div>
        <input type="submit" class="btn scc mt-2" value="Anlegen">
        <input type="button" class="btn scc mt-2" value="Zurück" onclick="ansichtToggle();">
    </form>
</div>

<div class="container-fluid" id="bearbeitenContainer">
    <table class="table table-hover table-sm" style="width:100%;margin:auto;">
        <thead>
            <tr> <!-- TODO Beschriftung € ändern? -->
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
    <input type="button" class="btn scc mt-5" value="Neu anlegen" onclick="ansichtToggle();">
</div>

<?php
include "../req/footer.php";
?>
