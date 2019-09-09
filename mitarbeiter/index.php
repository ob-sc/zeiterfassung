<?php
require "../req/expire.php";
include '../req/header.php';
?>

<h2 style="text-align:center">Mitarbeiter</h2>

<div id="maContainer" style="width:50%;margin:auto;border: 1px solid;">
    <table class="table table-hover table-sm">
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
