moment.locale('de')

let id, choices, station, status, kennung, name, datum, eaBeginn, eaEnde, beginnForm, endeForm, diff, gehalt, abDaten, ahDaten, eaDaten, tage, summe;

// sort
const firstBy=function(){function n(n){return n}function t(n){return"string"==typeof n?n.toLowerCase():n}function r(r,e){if(e="number"==typeof e?{direction:e}:e||{},"function"!=typeof r){var u=r;r=function(n){return n[u]?n[u]:""}}if(1===r.length){var i=r,o=e.ignoreCase?t:n;r=function(n,t){return o(i(n))<o(i(t))?-1:o(i(n))>o(i(t))?1:0}}return-1===e.direction?function(n,t){return-r(n,t)}:r}function e(n,t){return n=r(n,t),n.thenBy=u,n}function u(n,t){var u=this;return n=r(n,t),e(function(t,r){return u(t,r)||n(t,r)})}return e}();
// prepare sort by nachname
const sortByNachname = firstBy('nachname');

// hier getconfig -> wenn devmode = 1 dann header blau oder so

// namen, löhne und station für alle
$.get("../scripts/getdata.php", function(data){
    let result = JSON.parse(data);
    choices = result.namen;
    ahDaten = result.ahDaten;
    maDaten = result.maDaten;
    station = result.station;
    status = result.status;
    console.log(status); // todo test
})


// moment.js duration kann man nicht auf HH:mm formatieren. Daher string aus arbeitszeit minuten:
function zuStunden(azMinuten) {
    let stunden = Math.floor(azMinuten / 60);          
    let minuten = azMinuten % 60;
    if (stunden < 10) {
        stunden = "0" + stunden;
    }
    if (minuten < 10) {
        minuten = "0" + minuten;
    }
    let azString = stunden + ":" + minuten;
    return azString;
}

// DRUCKEN
function drucken() {
    $('.tabelle-rechts').css('width','100%');
    window.print();
}

// RUNDEN to fixed 2 / return als string
const roundTF = function(v) {    
    // value als string
    value = String(v);

    // wenn kein . dann return mit 2 nullen
    if (!value.includes('.')) {
        return value + '.00';
    }
    
    // trennen bei "."
    const values = value.split('.');
    const decimal = values[0];
    const decimalPlaceTotal = values[1];
    const twoPlaces = decimalPlaceTotal.substr(0, 2);
    
    // Prüfen auf kleiner drei Nachkommastellen
    if(decimalPlaceTotal.length < 3) {
        return String(
            decimal // Ganzzahl vor dem Komma
            + '.' // Dezimaltrenner
            + twoPlaces.padEnd(2, '0') // zwei Nachkommastellen aufgefüllt
        );
    }
    
    // dritte Nachkommastelle zur Prüfung auf- oder abrunden
    let decider = parseInt(decimalPlaceTotal[2], 10);
    
    // prüfen, ob auf- oder abrunden
    if(decider < 5) {
        // Abrunden
        return String(
            decimal // Ganzzahl vor dem Komma
            + '.' // Dezimaltrenner
            + twoPlaces // zwei Nachkommastellen
        );
    }
    
    // Prüfen ob Dezimalsprung
    if(twoPlaces === '99') {
        let decimalRoundedUp = parseInt(decimal, 10);
        decimalRoundedUp++;
        return String(
            decimalRoundedUp // aufgerundete Ganzzahl vor dem Komma
            + '.' // Dezimaltrenner
            + '00' // zwei Nachkommastellen auf Null
        );
    }
    
    // prüfen ob erste Stelle nicht Null
    if(decimalPlaceTotal[0] !== '0') {
        // "einfach" aufrunden
        let roundedUp = parseInt(twoPlaces, 10);
        roundedUp++;
        return String(
            decimal // Ganzzahl vor dem Komma
            + '.' // Dezimaltrenner
            + roundedUp // zwei aufgerundete Nachkommastellen
        );
    }
    
    // letzte Stelle zur Prüfung aufrunden
    let lastPlace = parseInt(decimalPlaceTotal[1], 10);
    lastPlace++;
    // prüfen ob Zehnersprung nach Aufrunden, dann zweistellig zurückgeben
    if(lastPlace > 9) {
        return String(
            decimal // Ganzzahl vor dem Komma
            + '.' // Dezimaltrenner
            + lastPlace // zwei aufgerundete Nachkommastellen
        );
    }
    
    // wenn kein Zehnersprung, dann "0" und einstellig zurückgeben
    return String(
        decimal // Ganzzahl vor dem Komma
        + '.' // Dezimaltrenner
        + '0' // Null anfügen
        + lastPlace // eine aufgerundete Nachkommastellen
    );
} 

// EINTRAGEN
function senden() {
    $.ajax({
        url: 'send.php',
        method: 'POST',
        data: {
            sid: id,
            sname: name,
            sdatum: datum,
            sbeginn: beginnForm, // Beginn und Ende müssen rein wegen Tabelle Einzelauswertung
            sende: endeForm,
            saz: diff,
            sgehalt: roundTF(gehalt),
            skennung: kennung
        }
    })
    .done(function(data) {
        $('#infoText').html(data);
        $('#infoAlert').show();
        $('#eform')[0].reset();
        console.log(roundTF(gehalt));
        document.getElementById('datum').valueAsDate = new Date();
    })
    .fail(function(data) {
        $('#fehlerText').html('<strong>Fehler:</strong>' + data.responseText);
        $('#fehlerAlert').show();
    })
    
    $('#esend').hide();
}

// EINTRAGEN
function formBerechnung() {
    kennung = $('#kennung').val()
    name = $('#nameInput').val();

    // Check ob Aushilfe existiert
    if (!ahDaten[name]) {
        $('#fehlerText').html('<strong>Aushilfe nicht gefunden!</strong>');
        $('#fehlerAlert').show();
        return;
    }

    id = ahDaten[name].id;

    $('#etext').html("<p><strong>Name:</strong> " + name + "</p>");
    let norlohn = ahDaten[name].norlohn;
    let samlohn = ahDaten[name].samlohn;
    let sonlohn = ahDaten[name].sonlohn;
    let lohn;
    
    datum = $('#datum').val();
    $('#etext').append("<p><strong>Datum:</strong> " + moment(datum).format('DD.MM.YYYY') + "</p>");

    // Check ob Datum in der Zukunft ist
    if(moment(datum).isAfter(new Date(), 'day') === true) {
        $('#fehlerText').html('<strong>Datum ist in der Zukunft!</strong>');
        $('#fehlerAlert').show();
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
    $('#etext').append("<p><strong>Arbeitszeit:</strong> " + moment.utc(ende.diff(beginn)).format("HH:mm") + "</p>\n");

    // Check ob AZ 0 oder negativ
    if (diff < 1) {
        $('#fehlerText').html('<strong>Beginn und Ende überprüfen!</strong>');
        $('#fehlerAlert').show();
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
    // Berechnung in Cent, da sonst falsch gerundet wird
    gehalt = lohn * 100 * diff / 60 / 100;
    $('#etext').append("<p><strong>Gehalt:</strong> " + roundTF(gehalt) + "€</p>\n");
    
    // senden knopf zeigen
    $('#esend').show();
}

// ABRECHNUNG
function abtabelle() {
    let summeAZ = 0;
    let summeGehalt = 0;

    let html = '<h3 style="text-align:center">Monatsabrechnung ' + station + ', ' + moment($('#datum').val(), 'YYYY-MM').format('MMMM YYYY') + '</h3>';
    html += '<table class="table table-bordered table-sm table-hover" style="width:100%">';
    html += '<caption>Abrechnungen als PDF an <a href="mailto:starcarlohn@steuerberater-kehler.de" style="color:blue">Lohnkanzlei</a></caption><thead><tr>';
    html += '<th style="width:5%">PN</th>';
    html += '<th style="width:40%">Name</th>';
    html += '<th style="width:5%">AZ</th>';
    html += '<th style="width:5%">Gehalt</th>';
    html += '<th style="width:5%">Tage</th>';
    html += '<th style="width:5%">Urlaub</th>';
    html += '<th style="width:5%">Status</th>';
    html += '<th style="width:30%">Abmelden ab dem</th>';
    html += '</tr></thead><tbody>';
    for (let x in abDaten) {
        let urlaub = Math.floor((24 / 312 * abDaten[x].urlaub) * 2) / 2; // Urlaub, auf halbe / ganze abgerundet
        let abgehalt = abDaten[x].gehalt;
        html += '<tr><td>' + abDaten[x].personalnr + '</td>';
        html += '<td>' + abDaten[x].nachname + ', ' + abDaten[x].vorname + '</td>';
        html += '<td>' + zuStunden(abDaten[x].arbeitszeit) + '</td>';
        html += '<td>' + roundTF(abgehalt) + '</td>';
        html += '<td>' + abDaten[x].datum + '</td>';
        html += '<td>' + urlaub + '</td>';
        html += '<td>' + abDaten[x].status + '</td>';
        html += '<td contenteditable="true">&nbsp</td></tr>';

        summeAZ += parseInt(abDaten[x].arbeitszeit);
        summeGehalt += abDaten[x].gehalt;
        
    }
    html += '<tr><td>&nbsp</td><td>&nbsp</td><th>' + zuStunden(summeAZ) + '</th><th>' + roundTF(summeGehalt) + '</th><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td><td>&nbsp</td></tr>';

    $('#atext').html(html + '</tbody></table><input type="button" onclick="drucken();" value="Drucken" class="noPrint btn scc">');
}

// AUSWERTEN
function eatabelle() {
    let eintragVorher, gehaltEA;
    let sonderRow = ' ';
    // Ende Funktion wenn keine Einträge
    if (tage.length == 0) {
        $('#infoText').html('<strong>Keine Einträge für diesen Monat!</strong>');
        $('#infoAlert').show();
        return;
    }
    // Tage im Monat
    let monatSelect = moment($('#datum').val(), 'YYYY-MM').format('M');
    let monatfuerTage = monatSelect - 1;
    let monatsTage = moment(monatfuerTage, 'M').daysInMonth();
    let eintragsTag = 10;
    let eaMonatJahr = eaBeginn;

    // wenn tag unter 10 -> null davor
    function plusNull(tag) {
        if (tag < 10) {
            return '0' + String(tag);
        } else {
            return tag;
        }
    }

    // Funktion normaler Eintrag
    function tagZeile(row) {
        gehaltEA = tage[row].gehalt;
        html += '<tr><td>' + plusNull(eintragsTag) + '.' + eaMonatJahr + '</td>';
        html += '<td>' + tage[row].beginn + '</td>';
        html += '<td>' + tage[row].ende + '</td>';
        html += '<td>' + moment.utc().startOf('day').add(tage[row].arbeitszeit, 'minutes').format('HH:mm') + '</td>';
        html += '<td>' + roundTF(gehaltEA) + '</td></tr>';
    }
    // Funktion Sondereintrag bei mehrfachem Datum
    function sonderZeile(row) {
        gehaltEA = tage[row].gehalt;
        sonderRow += '<tr><td>' + plusNull(eintragsTag) + '.' + eaMonatJahr + '</td>';
        sonderRow += '<td>' + tage[row].beginn + '</td>';
        sonderRow += '<td>' + tage[row].ende + '</td>';
        sonderRow += '<td>' + moment.utc().startOf('day').add(tage[row].arbeitszeit, 'minutes').format('HH:mm') + '</td>';
        sonderRow += '<td>' + roundTF(gehaltEA) + '</td></tr>';
    }
    // Variable mit String für Tabelle
    let html = '<h3 style="text-align:center">Arbeitszeitnachweis ' + $("#nameInput").val() + '<br>'  + moment(monatfuerTage, "M").format("MMMM") + '-' + moment($("#datum").val(), "YYYY-MM").format("MMMM YYYY") + '</h3>\n';
    html += '<table class="table table-bordered table-sm" style="width:100%"><thead><tr>';
    html += '<th style="width:20%">Tag</th>';
    html += '<th style="width:20%">Beginn</th>';
    html += '<th style="width:20%">Ende</th>';
    html += '<th style="width:20%">Arbeitszeit</th>';
    html += '<th style="width:20%">Gehalt</th></tr></thead><tbody>';
    // Loop für alle Abrechnungstage
    for (let i = 1; i <= monatsTage; i++) {
        let eintrag = false;
        // Loop für Objekt mit Tagen aus eaget.php
        for (let x in tage) {
            momentTag = moment(tage[x].datum, 'YYYY-MM-DD').format('D');
            // Normaler Eintrag
            if (eintragsTag == momentTag && eintragVorher != momentTag) {
                tagZeile(x);
                eintragVorher = momentTag;
                eintrag = true;
                delete tage[x];
                break;
            // Sondereintrag
            } else if (momentTag == eintragVorher) {
                eintrag = true;
                eintragsTag--;
                sonderZeile(x);
                delete tage[x];
                break;
            }
        }
        // Leerer Eintrag wenn davor nichts eingetragen wurde
        if (eintrag == false) {
            html += '<tr><td>' + plusNull(eintragsTag) + '.' + eaMonatJahr + '</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        }
        if (eintragsTag < monatsTage) {
            eintragsTag++;
        } else {
            eintragsTag = 1;
            eaMonatJahr = eaEnde;
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
    $('#eaText').append('<strong>Arbeitszeit:</strong> ' + zuStunden(summe['arbeitszeit']));
    $('#eaText').append('<br><strong>Arbeitstage:</strong> ' + summe['datum']);
    let sumGehalt = summe['gehalt'];
    $('#eaText').append('<br><strong>Gehalt:</strong> ' + roundTF(sumGehalt) + '€');
    // wieviel bis maximales monatsgehalt / schon drüber
    let statusMax = parseInt(ahDaten[$('#nameInput').val()].ahStatus);
    let bisMax = statusMax - sumGehalt;
    if (sumGehalt <= 450) {
        $('#eaText').append('<br>Noch ' + roundTF(bisMax) + '€ bis ' + roundTF(statusMax) + '€<br>');
    } else if (sumGehalt > 450) {
        $('#eaText').append('<br><strong style="color:red;">Schon ' + roundTF(-bisMax) + '€ über ' + roundTF(statusMax) + '€</strong><br>');
    }
    // Druckbutton
    $('#eaText').append('<input type="button" onclick="drucken();" value="Drucken" class="noPrint btn scc my-3">');
}

// Document ready
$(document).ready(function() {

    // für jeden input Datum - automatisch Datum heute
    let datumInput = document.getElementById('datum');
    if (datumInput) {
        datumInput.valueAsDate = new Date();
    } 

    // NACH DRUCKEN
    window.onafterprint = function() {
        $('.tabelle-rechts').css('width','70%');
    };

    // EINTRAGEN
    $('#eform').submit(function(e) {
        e.preventDefault();
        $('#fehlerAlert').hide();
        $('#infoAlert').hide();
        formBerechnung();
    })

    // EINTRAGEN
    $('#eform').change(function() {
        $('#esend').hide();
    })

    // ABRECHNUNG
    $('#aform').submit(function(e) {
        e.preventDefault();
        $('#fehlerAlert').hide();
        $('#infoAlert').hide();
        $.ajax({
            url: 'abget.php',
            type: 'POST',
            dataType: 'json',
            data: $('#aform').serialize()
        })
        .done(function(data) {
            abDaten = data.sort(sortByNachname);
            abtabelle();
        })
        .fail(function(data) {
            $('#fehlerText').html('Fehler:' + data.responseText);
            $('#fehlerAlert').show();
        })
    })

    // AUSWERTEN
    $('#eaform').submit(function(e) {
        e.preventDefault();
        $('#fehlerAlert').hide();
        $('#infoAlert').hide();

        name = $('#nameInput').val();
        id = ahDaten[name].id;

        datum = $('#datum').val();

        $.ajax({
            url: 'eaget.php',
            type: 'POST',
            dataType: 'json',
            data: {
                id: id,
                datum: datum
            }
        })
        .done(function(data) {
            eaDaten = data;
            tage = eaDaten.tage;
            summe = eaDaten.summe;
            eaBeginn = eaDaten.beginn;
            eaEnde = eaDaten.ende;
            eatabelle();
        })
        .fail(function(data) {
            $('#fehlerText').html('Fehler:' + data.responseText);
            $('#fehlerAlert').show();
        })
    })

    // AUSHILFEN anlegen / senden an anew.php
    $('#newForm').submit(function(e) {
        e.preventDefault();
        // Check ob Aushilfe schon existiert
        name = $('#nameInput').val();
        if (ahDaten[name] === true) {
            $('#fehlerText').html('</strong>Aushilfe existiert bereits!<strong>');
            $('#fehlerAlert').show();
            return;
        }
        $.ajax({
            url: 'anew.php',
            method: 'POST',
            data: $('#newForm').serialize()
        })
        .done(function(data) {
            $('#infoText').html(data);
            $('#infoAlert').show();
            $('#newForm')[0].reset();
        })
        .fail(function(data) {
            $('#fehlerText').html('<strong>Fehler:</strong>' + data.responseText);
            $('#fehlerAlert').show();
        })
    })

    // AUSHILFEN personalnummer
    $('#ahpnForm').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'ahpn.php',
            method: 'POST',
            data: $('#ahpnForm').serialize()
        })
        .done(function() {
            location.reload();
        })
        .fail(function(data) {
            $('#fehlerText').html('<strong>Fehler:</strong>' + data.responseText);
            $('#fehlerAlert').show();
        })
    })
})

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

    // ADMIN / SL für Menü
    if (status == 'admin') {
        $('#admin').show();
    }
    if (status == 'admin' || status == 'sl') {
        $('.priv').removeClass('disabled');
    }

    // AUSHILFEN bearbeiten
    // Erstellen der Tabelle, jedes td hat ID mit Personal-ID für den Inhalt
    let ahRow;
    for (let x in ahDaten) {
        ahRow += '<tr><td>' + ahDaten[x].personalnr + '</td>';
        ahRow += '<td>' + x + '</td>';
        ahRow += '<td contenteditable="false" id="nor' + ahDaten[x].id + '">' + roundTF(ahDaten[x].norlohn) + '</td>';
        ahRow += '<td contenteditable="false" id="sam' + ahDaten[x].id + '">' + roundTF(ahDaten[x].samlohn) + '</td>';
        ahRow += '<td contenteditable="false" id="son' + ahDaten[x].id + '">' + roundTF(ahDaten[x].sonlohn) + '</td>';
        ahRow += '<th><img src="../img/edit.svg" width="18" class="edit" id="' + ahDaten[x].id + '"></th></tr>';
    }
    $('#ahTab').html(ahRow);

    // Bei klick auf Bearbeiten-img
    $('.edit').click(function() {
        let currentTD = $(this).parents('tr').find('td');
        let id = $(this).attr('id');

        // Bei Stift-Bild: Zeile kann bearbeitet werden, ändert sich auf speichern
        if ($(this).attr('src') == '../img/edit.svg') {
            $.each(currentTD, function() {
                if ($(this).prop('contenteditable') == "false") {
                    $(this).prop('contenteditable', true);
                }
            })
            $(this).parents('tr').addClass('table-warning');
            $(this).attr('src', '../img/save.svg');
            return;
        }

        // TODO nur eine zeile bearbeiten? -> wenn man ein anderen stift klickt alle anderen auf stift, nicht gelb und contenteditable="false" ändern

        // Bei Disketten-Bild: Zeile wird gespeichert -> variablen aus IDs der Zellen werden erstellt und dann per ajax an php gesendet
        if ($(this).attr('src') == '../img/save.svg') {
            $.each(currentTD, function() {
                $(this).prop('contenteditable', false);
            })
            $(this).parents('tr').removeClass('table-warning');
            $(this).attr('src', '../img/edit.svg');

            // Werte aus contenteditable Feldern
            let norval = $('#nor' + id).text();
            let samval = $('#sam' + id).text();
            let sonval = $('#son' + id).text();

            // Objekt mit Daten an ajax
            let ahEdit = {
                'id' : id,
                'norlohn' : norval.replace(",", "."),
                'samlohn' : samval.replace(",", "."),
                'sonlohn' : sonval.replace(",", ".")
            }
            
            // Senden an aedit.php
            $.ajax({
                url: 'aedit.php',
                method: 'POST',
                data: ahEdit
            })
            .done(function() {
                location.reload();
            })
            .fail(function(data) {
                $('#fehlerText').html('<strong>Fehler:</strong>' + data.responseText);
                $('#fehlerAlert').show();
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
    
    // AUSHILFEN bearbeiten / PERSONALNUMMERN
    let ahpnRow;
    for (let x in ahDaten) {
        if (ahDaten[x].personalnr === 0) {
            ahpnRow += '<tr><td>' + x + '</td>';
            ahpnRow += '<td><input type="number" class="form-control-sm" name="' + ahDaten[x].id + '"></td></tr>';
        }
    }
    $('#ahpnTab').html(ahpnRow);

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
})
