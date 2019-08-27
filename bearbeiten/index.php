<?php
require "../req/expire.php";
include "../req/header.php";
?>

<div class="container-fluid">
    <table class="table table-hover table-sm" style="width:80%;margin: auto;">
        <thead>
            <tr>
                <th scope="col" width="5%">PN</th>
                <th scope="col" width="50%">Name</th>
                <th scope="col" width="8%">€ Wochentag</th>
                <th scope="col" width="8%">€ Samstag</th>
                <th scope="col" width="8%">€ Sonntag</th>
                <th scope="col" width="2%">&nbsp</th>
            </tr>
        </thead>
        <tbody id="ahTab">
        </tbody>
    </table>
</div>

<script>
$(document).ajaxComplete(function() {
    console.log(choices);
    console.log(ahDaten);
    let html;
    for (let x in ahDaten) {
        html += '<tr><th scope="row">' + ahDaten[x].personalnr + '</th>';
        html += '<td>' + x + '</td>';
        html += '<td>' + ahDaten[x].norlohn.toFixed(2) + '</td>';
        html += '<td>' + ahDaten[x].samlohn.toFixed(2) + '</td>';
        html += '<td>' + ahDaten[x].sonlohn.toFixed(2) + '</td>';
        html += '<td><image src="../img/edit.svg" width="18" id="edit"></td></tr>';
    }
    $('#ahTab').html(html);
});

</script>

<?php
include "../req/footer.php";
?>
