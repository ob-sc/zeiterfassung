<?php
require "../req/expire.php";
include "../req/header.php";
?>
<!-- zu form machen --> 
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
            <input type="number" class="form-control m-1" placeholder="Wochentag" name="norlohn" id="anlegenNor">
            <input type="number" class="form-control m-1" placeholder="Samstag" name="samlohn" id="anlegenSam">
            <input type="number" class="form-control m-1" placeholder="Sonntag" name="sonlohn" id="anlegenSon">
        </div>
        <input type="submit" class="btn scc mt-2" value="Anlegen">
        <input type="button" class="btn scc mt-2" value="Zurück" onclick="ansichtToggle();">
    </form>
</div>

<script>
// BEARBEITEN anlegen / senden an anew.php
$(document).ready(function() {
    $('#newform').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'anew.php',
            method: 'POST',
            data: $("#newform").serialize()
        })
        // TODO hier mit function(data) etwas ausgeben? alert?
        .done(function(data) {
            console.log('erfolg\n' + data);
        })
        .fail(function(data) {
            // TODO ordentliche nachricht
            alert('fuuuuuuck\n' + data);
        })
    })
    // ordenltiche erfolgnachricht dann form reset?
});
</script>


<div class="container-fluid" id="bearbeitenContainer">
    <table class="table table-hover table-sm" style="width:100%;margin:auto;">
        <thead>
            <tr> <!-- TODO Beschriftung € ändern? -->
                <th width="8%">PN</th>
                <th width="54%">Name</th>
                <th width="12%">€ Wochentag</th>
                <th width="12%">€ Samstag</th>
                <th width="12%">€ Sonntag</th>
                <th width="2%">&nbsp</th>
            </tr>
        </thead>
        <tbody id="ahTab">
        </tbody>
    </table>
    <input type="button" class="btn scc mt-5" value="Neu anlegen" onclick="ansichtToggle();">
</div>

<script>

// TODO fehlermeldung wenn zb feld personalnr kein integer -> aktuell wird der wert einfach nicht in die DB eingetragen
// TODO wenn komma -> zu punkt ändern (bei euro werten)
// TODO nur eine zeile bearbeiten? -> wenn man ein anderen stift klickt alle anderen auf stift, nicht gelb und contenteditable="false" ändern

$(document).ajaxComplete(function() {
    let ahRow;
    // Erstellen der Tabelle, jedes td hat ID mit Personal-ID für den Inhalt
    for (let x in ahDaten) {
        ahRow += '<tr><td contenteditable="false" id="pn' + ahDaten[x].id + '">' + ahDaten[x].personalnr + '</th>';
        ahRow += '<td contenteditable="false" id="name' + ahDaten[x].id + '">' + x + '</td>';
        ahRow += '<td contenteditable="false" id="nor' + ahDaten[x].id + '">' + ahDaten[x].norlohn.toFixed(2) + '</td>';
        ahRow += '<td contenteditable="false" id="sam' + ahDaten[x].id + '">' + ahDaten[x].samlohn.toFixed(2) + '</td>';
        ahRow += '<td contenteditable="false" id="son' + ahDaten[x].id + '">' + ahDaten[x].sonlohn.toFixed(2) + '</td>';
        ahRow += '<th><img src="../img/edit.svg" width="18" class="edit" id="' + ahDaten[x].id + '"></th></tr>';
    }
    // TODO wenn vorhanden? wie datum
    $('#ahTab').html(ahRow);

    // Bei klick auf bearbeiten-img
    $('.edit').click(function() {
        let currentTD = $(this).parents('tr').find('td');
        let id = $(this).attr('id');

        // Bei Stift-Bild: Zeile kann bearbeitet werden, ändert sich auf speichern
        if ($(this).attr('src') == '../img/edit.svg') {
            $.each(currentTD, function() {
                $(this).prop('contenteditable', true);
            })
            $(this).parents('tr').addClass('table-warning');
            $(this).attr('src', '../img/save.svg');
            return;
        }

        // werte vom edit vorm senden per ajax auf typ überprüfen? (lohn nur float ...)

        // Bei Disketten-Bild: Zeile wird gespeichert -> variablen aus IDs der Zellen werden erstellt und dann per ajax an php gesendet
        if ($(this).attr('src') == '../img/save.svg') {
            $.each(currentTD, function() {
                $(this).prop('contenteditable', false);
            })
            $(this).parents('tr').removeClass('table-warning');
            $(this).attr('src', '../img/edit.svg');

            // Objekt mit Daten an ajax
            let ahEdit = {
                'id' : id,
                'personalnr' : $('#pn' + id).text(),
                'name' : $('#name' + id).text(),
                'norlohn' : $('#nor' + id).text(),
                'samlohn' : $('#sam' + id).text(),
                'sonlohn' : $('#son' + id).text()
            };
            // Senden an aedit.php
            $.ajax({
                url: 'aedit.php',
                method: 'POST',
                data: ahEdit
            })
            // TODO hier mit function(data) etwas ausgeben? alert?
            .done(function() {
                console.log('erfolg');
                location.reload();
            })
            .fail(function(data) {
                // TODO ordentliche nachricht
                alert('fuuuuuuck\n' + data);
            })
        }
    })

    // Bei Enter: keine neue Zeile
    $('td[contenteditable]').keydown(function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $(this).blur();
        }
    })
});

function ansichtToggle() {
    $('#anlegenContainer').toggle();
    $('#bearbeitenContainer').toggle();
}
</script>

<?php
include "../req/footer.php";
?>
