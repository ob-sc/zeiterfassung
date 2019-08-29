moment.locale('de')

let choices, ahDaten, station, status, kennung, name, datum, beginnForm, endeForm, diff, daten, tage, summe, ahRow;

// namen, löhne und station für alle
// mega komisch, geht ohne url: braucht json parse, evtl type: 'json' geben?!
$.get("../scripts/getdata.php", function(data){
    let result = JSON.parse(data); // JSON.parse trotz json_encode? sonst gehts halt iwie nicht. vermutlich wegen array?
    choices = result.namen;
    ahDaten = result.ahDaten;
    station = result.station;
    status = result.status;
});

// EINTRAGEN
function senden() {
    $.ajax({
        url: 'send.php',
        method: 'POST',
        data: {
            sname: name,
            sdatum: datum,
            // Beginn und Ende müssen rein wegen Tabelle Einzelauswertung
            sbeginn: beginnForm,
            sende: endeForm,
            saz: diff,
            sgehalt: gehaltRund,
            skennung: kennung
        }
    })
    .done(function(data) {
        $('#etext').html(data);
        $('#eform')[0].reset();
        document.getElementById('datum').valueAsDate = new Date();
    })
    .fail(function(data) {
        alert('Fehler:\n' + data);
    })
    
    $('#esend').hide();
};

// EINTRAGEN
function formBerechnung() {
    kennung = $('#kennung').val()
    name = $('#nameInput').val();
    $('#etext').html("<p><strong>Name:</strong> " + name + "</p>");
    let norlohn = ahDaten[name].norlohn;
    let samlohn = ahDaten[name].samlohn;
    let sonlohn = ahDaten[name].sonlohn;
    let lohn;
    
    datum = $('#datum').val();
    $('#etext').append("<p><strong>Datum:</strong> " + moment(datum).format('DD.MM.YYYY') + "</p>\n");

    // Check ob Datum in der Zukunft ist
    if(moment(datum).isAfter(new Date(), 'day') === true) {
        $('#etext').html('<h4>Datum ist in der Zukunft</h4>');
        $('#esend').hide();
        return;
    }

    $('#etext').append("<p><strong>Wochentag:</strong> " + moment(datum).format('dddd') + "</p>\n");

    let beginn = moment($('#beginn').val(), 'HH:mm'); 
    beginnForm = moment(beginn).format('HH:mm');
    $('#etext').append("<p><strong>Beginn:</strong> " + beginnForm + "</p>\n");

    let ende = moment($('#ende').val(), 'HH:mm');
    endeForm = moment(ende).format('HH:mm');
    $('#etext').append("<p><strong>Ende:</strong> " + endeForm + "</p>\n");
    
    diff =  ende.diff(beginn, 'minutes');
    let diffForm = moment.utc(ende.diff(beginn)).format("HH:mm");
    $('#etext').append("<p><strong>Arbeitszeit:</strong> " + diffForm + "</p>\n");

    // Check ob AZ 0 oder negativ
    if (diff < 1) {
        $('#etext').html('<h4>Beginn und Ende überprüfen!</h4>');
        $('#esend').hide();
        return;
    }

    // Gehalt
    if (moment(datum).isoWeekday() == 7) {
        lohn = sonlohn;
    } else if (moment(datum).isoWeekday() == 6) {
        lohn = samlohn;
    } else {
        lohn = norlohn;
    }
    let gehalt = lohn / 60 * diff;
    gehaltRund = gehalt.toFixed(2);
    $('#etext').append("<p><strong>Gehalt:</strong> " + gehaltRund + "€</p>\n");
};

// ABRECHNUNG
function abtabelle() {
    // TODO Urlaubstage

    let html = '<h3 style="text-align:center">Monatsabrechnung ' + station + ', ' + moment($('#datum').val(), 'YYYY-MM').format('MMMM YYYY') + '</h3>';
    html += '<table class="table table-bordered table-sm" style="width:100%"><thead><tr>';
    html += '<th style="width:10%">PN</th>';
    html += '<th style="width:50%">Name</th>';
    html += '<th style="width:10%">Arbeitszeit</th>';
    html += '<th style="width:10%">Gehalt</th>';
    html += '<th style="width:10%">Tage</th>';
    html += '<th style="width:10%">Urlaubstage</th>';
    html += '</tr></thead><tbody>';
    for (let x in daten) {
        let urlaub = ""/* hier formel mit: daten[x].tage */;
        let gehalt = daten[x].gehalt;
        // Wenn Gehalt im Monat über 450 -> Zeile Rot
        if (daten[x].gehalt > 450) {
            html += '<tr class="table-danger">';
        } else {
            html += '<tr>';
        }
        html += '<td>' + daten[x].personalnr + '</th>';
        html += '<td>' + daten[x].name + '</td>';
        html += '<td>' + moment.utc().startOf('day').add(daten[x].arbeitszeit, 'minutes').format('HH:mm') + '</td>';
        html += '<td>' + gehalt.toFixed(2) + '</td>';
        html += '<td>' + daten[x].tage + '</td>';
        html += '<td>' + urlaub + '</td></tr>';
    }
    $('#atext').html(html + '</tbody></table><input type="button" onclick="window.print();" value="Drucken" class="noPrint btn scc">');
}

// AUSWERTEN
function eatabelle() {
    let eintragVorher, gehaltEA;
    let sonderRow = ' ';
    // Ende Funktion wenn keine Einträge
    if (tage.length == 0) {
        $('#eaText').html('<h3>Keine Einträge für diesen Monat</h3>');
        return;
    }
    // Tage im Monat
    let monatstage = moment($('#datum').val(), "YYYY-MM").daysInMonth();
    // Funktion normaler Eintrag
    function tagZeile(row) {
        gehaltEA = tage[row].gehalt;
        html += '<tr><th>' + momentTag + '</th>';
        html += '<td>' + tage[row].beginn + '</td>';
        html += '<td>' + tage[row].ende + '</td>';
        html += '<td>' + moment.utc().startOf('day').add(tage[row].arbeitszeit, 'minutes').format('HH:mm') + '</td>';
        html += '<td>' + gehaltEA.toFixed(2) + '</td></tr>';
    }
    // Funktion Sondereintrag bei mehrfachem Datum
    function sonderZeile(row) {
        gehaltEA = tage[row].gehalt
        sonderRow += '<tr><th>' + momentTag + '</th>';
        sonderRow += '<td>' + tage[row].beginn + '</td>';
        sonderRow += '<td>' + tage[row].ende + '</td>';
        sonderRow += '<td>' + moment.utc().startOf('day').add(tage[row].arbeitszeit, 'minutes').format('HH:mm') + '</td>';
        sonderRow += '<td>' + gehaltEA.toFixed(2) + '</td></tr>';
    }
    // Variable mit String für Tabelle
    let html = '<h3 style="text-align:center">Monatsübersicht ' + $('#nameInput').val() + ', ' + moment($('#datum').val(), 'YYYY-MM').format('MMMM YYYY') + '</h3>\n';
    html += '<table class="table table-bordered table-sm" style="width:100%"><thead><tr>';
    html += '<th style="width:20%">Tag</th>';
    html += '<th style="width:20%">Beginn</th>';
    html += '<th style="width:20%">Ende</th>';
    html += '<th style="width:20%">Arbeitszeit</th>';
    html += '<th style="width:20%">Gehalt</th></tr></thead><tbody>';
    // Loop für alle Monatstage
    for (let i = 1; i <= monatstage; i++) {
        let eintrag = false;
        // Loop für Objekt mit Tagen aus eaget.php
        for (let x in tage) {
            momentTag = moment(tage[x].datum, 'YYYY-MM-DD').format('D');
            // Normaler Eintrag
            if (i == momentTag && eintragVorher != momentTag) {
                tagZeile(x);
                eintragVorher = momentTag;
                eintrag = true;
                delete tage[x];
                break;
            // Sondereintrag
            } else if (momentTag == eintragVorher) {
                eintrag = true;
                sonderZeile(x);
                html += '<tr><th>' + i + '</th><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
                delete tage[x];
                break;
            }
        }
        // Leerer Eintrag wenn davor nichts eingetragen wurde
        if (eintrag == false) {
            html += '<tr><th>' + i + '</th><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        }
    }
    // Wiedergeben der Tabelle
    $('#eaText').html(html + '</tbody></table>');
    // Tabelle für Sondereinträge
    let sonderEintrag = '<h3 style="text-align:center;">Sondereinträge</h3>';
    sonderEintrag += '<table class="table table-bordered table-sm" style="width:100%;"><thead><tr>';
    sonderEintrag += '<th style="width:20%">Tag</th>';
    sonderEintrag += '<th style="width:20%">Beginn</th>';
    sonderEintrag += '<th style="width:20%">Ende</th>';
    sonderEintrag += '<th style="width:20%">Arbeitszeit</th>';
    sonderEintrag += '<th style="width:20%">Gehalt</th></tr></thead><tbody>';
    sonderEintrag += sonderRow;
    // Wenn die Tabelle Sondereinträge nicht leer ist -> diese wiedergeben
    if (sonderRow.length > 1) {
        $('#eaText').append(sonderEintrag + '</tbody></table>');
    }
    // Zusammenrechnung des Monats aus eaget.php
    $('#eaText').append('<strong>Arbeitszeit:</strong> ' + moment.utc().startOf('day').add(summe['SUM(arbeitszeit)'], 'minutes').format('HH:mm'));
    let sumGehalt = summe['SUM(gehalt)'];
    $('#eaText').append('<br><strong>Gehalt:</strong> ' + sumGehalt.toFixed(2) + '€');
    $('#eaText').append('<br><strong>Arbeitstage:</strong> ' + summe['COUNT(DISTINCT datum)'] + '<br>');
    
    // Druckbutton
    $('#eaText').append('<input type="button" onclick="window.print();" value="Drucken" class="noPrint btn scc my-3">');
};

// BEARBEITEN
function ansichtToggle() {
    $('#anlegenContainer').toggle();
    $('#bearbeitenContainer').toggle();
}

$(document).ready(function() {
    // ADMIN / SL für Menü
    if (status == 'admin') {
        $('#admin').show();
    }
    if (status == 'station') {
        $('.priv').addClass('disabled');
    }

    // INDEX / EXPIRE
    if (window.location.hash == '#expire') {
        $('#expAlert').show();
        history.replaceState(null, null, ' ');
    }

    // EINTRAGEN
    $('#eform').submit(function(e) {
        e.preventDefault();
        $('#esend').show();
        formBerechnung();
    })

    // ABRECHNUNG
    $('#aform').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'abget.php',
            type: 'POST',
            dataType: 'json',
            data: $("#aform").serialize()
        })
        .done(function(data) {
            daten = data;
            abtabelle();
        })
        .fail(function(data) {
            alert('Fehler:\n' + data);
        })
    })

    // AUSWERTEN
    $('#eaform').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'eaget.php',
            type: 'POST',
            dataType: 'json',
            data: $("#eaform").serialize(),
        })
        .done(function(data) {
            daten = data;
            tage = daten.tage;
            summe = daten.summe;
            eatabelle();
        })
        .fail(function(data) {
            alert('Fehler:\n' + data);
        })
    });

    // für jeden input Datum - automatisch Datum heute
    let datum = document.getElementById('datum');
    if (datum) {
        document.getElementById('datum').valueAsDate = new Date();
    } 

    // EINTRAGEN
    $('#eform').change(function() {
        $('#esend').hide();
    })

    // BEARBEITEN anlegen / senden an anew.php
    $('#newform').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'anew.php',
            method: 'POST',
            data: $("#newform").serialize()
        })
        // TODO statt alert ajax daneben? modal?
        .done(function(data) {
            alert(data);
            $('#newform')[0].reset();
        })
        .fail(function(data) {
            alert('Fehlgeschlagen:\n' + data);
        })
    })
});

$(document).ajaxComplete(function() {
    // AUTOCOMPLETE
    $('#nameInput').autoComplete({
        minChars: 1,
        delay: 0,
        source: function(term, suggest){
            term = term.toLowerCase();
            var matches = [];
            for (i=0; i<choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
            suggest(matches);
        }
    })

    // BEARBEITEN Aushilfe bearbeiten
    // Erstellen der Tabelle, jedes td hat ID mit Personal-ID für den Inhalt

    // TODO bei klick auf speichern werden aushilfen noch mal in Tabelle eingefügt
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

        
        // TODO Werte vom edit vorm senden per ajax auf typ überprüfen? (lohn nur float ...) -> Dann Fehlermeldung
        //      -> Personalnr darf nur 4 Stellen? Nur int?
        // TODO wenn komma -> zu punkt ändern (bei euro werten)
        // TODO nur eine zeile bearbeiten? -> wenn man ein anderen stift klickt alle anderen auf stift, nicht gelb und contenteditable="false" ändern

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
            .done(function(data) {
                console.log(data);
                location.reload();
            })
            .fail(function(data) {
                alert('Fehler:\n' + data);
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
