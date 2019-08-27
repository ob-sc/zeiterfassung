<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="container-fluid">
    <table class="table table-hover table-sm" style="width:80%;margin: auto;">
        <thead>
            <tr>
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

<script>
$(document).ajaxComplete(function() {
    let html;
    for (let x in ahDaten) {
        html += '<tr><td contenteditable="false">' + ahDaten[x].personalnr + '</th>';
        html += '<td contenteditable="false">' + x + '</td>';
        html += '<td contenteditable="false">' + ahDaten[x].norlohn.toFixed(2) + '</td>';
        html += '<td contenteditable="false">' + ahDaten[x].samlohn.toFixed(2) + '</td>';
        html += '<td contenteditable="false">' + ahDaten[x].sonlohn.toFixed(2) + '</td>';
        html += '<th><img src="../img/edit.svg" width="18" class="edit" id="' + ahDaten[x].id + '"></th></tr>';
    }
    // TODO wenn vorhanden? wie datum
    $('#ahTab').html(html);
});

// fehlermeldung wenn zb feld personalnr kein integer
// Bei enter keine neue zeile sondern save feld
// nur eine zeile bearbeiten?

// statt $('#' + id) einfach $(this)? -> dann oben html += die id weg

$(document).ready(function() {
    $('.edit').click(function() {
        let currentTD = $(this).parents('tr').find('td');
        let id = $(this).attr('id');

        if ($(this).attr('src') == '../img/edit.svg') {
            $.each(currentTD, function() {
                $(this).prop('contenteditable', true);
            })
            $(this).parents('tr').addClass('table-warning');
            $(this).attr('src', '../img/save.svg');
            return;
        }

        // werte vom edit vorm senden per ajax auf typ überprüfen? (lohn nur float ...)

        if ($('#' + id).attr('src') == '../img/save.svg') {
            $.each(currentTD, function () {
                $(this).prop('contenteditable', false);
            })
            $(this).parents('tr').removeClass('table-warning');
            $('#' + id).attr('src', '../img/edit.svg');
            // hier ajax post
            console.log('swoosh');
        }
    })
});



</script>

<?php
include "../req/footer.php";
?>
