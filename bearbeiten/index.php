<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="container-fluid">
    <table class="table table-hover table-sm" style="width:80%;margin: auto;">
        <thead>
            <tr> <!-- TODO Beschriftung € ändern? -->
                <th width="5%">PN</th>
                <th width="50%">Name</th>
                <th width="8%">€ Wochentag</th>
                <th width="8%">€ Samstag</th>
                <th width="8%">€ Sonntag</th>
                <th width="2%">&nbsp</th>
            </tr>
        </thead>
        <tbody id="ahTab">
        </tbody>
    </table>
</div>

<!--
<div class="container">
    Aushilfe Anlegen
</div>
-->
<script>

// TODO fehlermeldung wenn zb feld personalnr kein integer
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
</script>

<?php
include "../req/footer.php";
?>
