<?php
require "../req/expire.php";
include '../req/header.php';
?>

<h2 style="text-align:center">Mitarbeiter</h2>

<div class="container" id="maContainer">
    <table class="table table-hover table-sm" style="width:50%;margin:auto;">
        <thead>
            <tr>
                <th style="width:60%">Name</th>
                <th style="width:20%">Status</th>
                <th style="width:20%">Bestätigen</th>
            </tr>
        </thead>
        <tbody id="maTab">
        </tbody>
    </table>
</div>


<script>
$(document).ajaxComplete(function() {
    // MITARBEITER bearbeiten
    let maRow;
    for (let x in maDaten) {
        if (maDaten[x].status == 'neu') {
            maRow += '<tr class="table-danger"><td>' + maDaten[x].username + '</td>';
            maRow += '<td>' + maDaten[x].status + '</td>';
            maRow += '<th><img src="../img/confirm.svg" width="18" class="confirm" id="' + maDaten[x].id + '"></th></tr>';
        } else {
            maRow += '<tr><td>' + maDaten[x].username + '</td>';
            maRow += '<td>Bestätigt</td>';
            maRow += '<td>&nbsp</td></tr>'
        }
    }
    $('#maTab').html(maRow);

    $('.confirm').click(function() {
        let id = $(this).attr('id');
        $.ajax({
                url: 'maedit.php',
                method: 'POST',
                data: {id: id}
            })
            .done(function() {
                location.reload();
            })
            .fail(function(data) {
                $('#fehlerText').html('<strong>Fehler:</strong>' + data.responseText);
                $('#fehlerAlert').show();
            })
    })
});
</script>
