moment.locale('de')

let choices, loehne, kennung, name, datum, beginnForm, endeForm, diffMinuten, gehalt, daten;
let tage, summe;

// namen, löhne und station für alle
$.get("../scripts/getdata.php", function(data){
    let result = JSON.parse(data); // JSON.parse trotz json_encode? sonst gehts halt iwie nicht. vermutlich wegen array?
    choices = result.namen;
    loehne = result.loehne;
    station = result.station;
});

// EINTRAGEN
function senden() {
    $.ajax({
        url: 'send.php', // TODO anpassen wenn in anderer js datei
        method: 'POST',
        data: {
            sname: name,
            sdatum: datum,
            // Beginn und Ende müssen rein wegen Tabelle Einzelauswertung
            sbeginn: beginnForm,
            sende: endeForm,
            saz: diffMinuten,
            sgehalt: gehaltRund,
            skennung: kennung
        }
    })
    .done(function(data) {
        $('#etext').html(data);
        $('#eform')[0].reset();
        document.getElementById('datum').valueAsDate = new Date();
    })
    
    $('#esend').hide();
};

// EINTRAGEN
// TODO als const deklarieren? https://dmitripavlutin.com/6-ways-to-declare-javascript-functions/
function formBerechnung() {
    kennung = $('#kennung').val()
    name = $('#nameInput').val();
    $('#etext').html("<p><strong>Name:</strong> " + name + "</p>");
    let norlohn = loehne[name].norlohn;
    let samlohn = loehne[name].samlohn;
    let sonlohn = loehne[name].sonlohn;
    let lohn;
    
    datum = $('#datum').val();
    $('#etext').append("<p><strong>Datum:</strong> " + moment(datum).format('DD.MM.YYYY') + "</p>\n");

    // Check ob Datum in der Zukunft ist
    if(moment(datum).isAfter(new Date(), 'day') === true) {
        $('#etext').html('<h4>Datum ist in der Zukunft</h4>');
        $('#esend').hide();
        return;
    }

    let wochentag = moment(datum).isoWeekday();
    // TODO wochtentag vereinfachen / zusammenfassen?
    $('#etext').append("<p><strong>Wochentag:</strong> " + moment(datum).format('dddd') + "</p>\n");

    let beginn = moment($('#beginn').val(), 'HH:mm'); 
    beginnForm = moment(beginn).format('HH:mm'); // TODO "beginn" austauschen und variable beginn nennen? alle austauschen! achtung bei diff
    $('#etext').append("<p><strong>Beginn:</strong> " + beginnForm + "</p>\n");

    let ende = moment($('#ende').val(), 'HH:mm');
    endeForm = moment(ende).format('HH:mm'); // TODO "ende" austauschen und variable ende nennen? alle austauschen! achtung bei diff
    $('#etext').append("<p><strong>Ende:</strong> " + endeForm + "</p>\n");
    
    // TODO das muss besser gehen?
    diffMinuten =  ende.diff(beginn, 'minutes');
    let diff = ende.diff(beginn);
    let diffForm = moment.utc(diff).format("HH:mm");
    $('#etext').append("<p><strong>Arbeitszeit:</strong> " + diffForm + "</p>\n");

    // Check ob AZ 0 oder negativ
    if (diff < 1) {
        $('#etext').html('<h4>Beginn und Ende überprüfen!</h4>');
        $('#esend').hide();
        return;
    }

    // Gehalt
    if (wochentag == 7) {
        lohn = sonlohn;
    } else if (wochentag == 6) {
        lohn = samlohn;
    } else {
        lohn = norlohn;
    }
    gehalt = lohn / 60 * diffMinuten;
    gehaltRund = gehalt.toFixed(2);
    $('#etext').append("<p><strong>Gehalt:</strong> " + gehaltRund + "€</p>\n");
    
    // TODO moment().toJSON(); für sql?
};

// ABRECHNUNG
function abtabelle() {
    // TODO WICHTIG URLAUBSTAGE
    let html = '<h3 style="text-align:center">Monatsabrechnung ' + station + ', ' + moment($('#datum').val(), 'YYYY-MM').format('MMMM YYYY') + '</h3>';
    html += '<table class="table table-bordered" style="width:100%"><thead><tr>';
    // th style="width:x%"
    html += '<th scope="col">PN</th>';
    html += '<th scope="col">Name</th>';
    html += '<th scope="col">Arbeitszeit</th>';
    html += '<th scope="col">Gehalt</th>';
    html += '<th scope="col">Tage</th>';
    //html += '<th scope="col">Urlaubstage</th>';
    html += '</tr></thead><tbody>';
    for (let x in daten) {
        let gehalt = daten[x].gehalt;
        // Wenn Gehalt im Monat über 450 -> Zeile Rot
        if (daten[x].gehalt > 450) {
            html += '<tr class="table-danger">';
        } else {
            html += '<tr>';
        }
        html += '<th scope="row">' + daten[x].personalnr + '</th>';
        html += '<td>' + daten[x].name + '</td>\n';
        html += '<td>' + moment.utc().startOf('day').add(daten[x].arbeitszeit, 'minutes').format('HH:mm') + '</td>';
        html += '<td>' + gehalt.toFixed(2) + '</td>';
        html += '<td>' + daten[x].tage + '</td></tr>';
        // noch urlaubstage
    }
    $('#atext').html(html + '</tbody></table><input type="button" onclick="window.print();" value="Drucken" class="noPrint btn scc">');
}

// AUSWERTEN
function eatabelle() {
    let eintragVorher, gehaltEA, seVorhanden;
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
        html += '<tr><th scope="row">' + momentTag + '</th>';
        html += '<td>' + tage[row].beginn + '</td>';
        html += '<td>' + tage[row].ende + '</td>';
        html += '<td>' + moment.utc().startOf('day').add(tage[row].arbeitszeit, 'minutes').format('HH:mm') + '</td>';
        html += '<td>' + gehaltEA.toFixed(2) + '</td></tr>';
    }
    // Funktion Sondereintrag bei mehrfachem Datum
    function sonderZeile(row) {
        gehaltEA = tage[row].gehalt
        sonderRow += '<tr><th scope="row">' + momentTag + '</th>';
        sonderRow += '<td>' + tage[row].beginn + '</td>';
        sonderRow += '<td>' + tage[row].ende + '</td>';
        sonderRow += '<td>' + moment.utc().startOf('day').add(tage[row].arbeitszeit, 'minutes').format('HH:mm') + '</td>';
        sonderRow += '<td>' + gehaltEA.toFixed(2) + '</td></tr>';
    }
    // Variable mit String für Tabelle
    let html = '<h3 style="text-align:center">Monatsübersicht ' + $('#nameInput').val() + ', ' + moment($('#datum').val(), 'YYYY-MM').format('MMMM YYYY') + '</h3>\n';
    html += '<table class="table table-bordered table-sm" style="width:100%"><thead><tr>';
    html += '<th style="width:20%" scope="col">Tag</th>';
    html += '<th style="width:20%" scope="col">Beginn</th>';
    html += '<th style="width:20%" scope="col">Ende</th>';
    html += '<th style="width:20%" scope="col">Arbeitszeit</th>';
    html += '<th style="width:20%" scope="col">Gehalt</th></tr></thead><tbody>';
    // Loop für alle Monatstage
    for (let i = 1; i <= monatstage; i++) {
        let eintrag = false;
        // Loop für Objekt mit Tagen aus eaget.php
        for (let x in tage) {
            momentTag = moment(tage[x].datum, 'YYYY-MM-DD').format('D');
            // console.log('x: ' + x + ', i: ' + i + ', momentTag: ' + momentTag + ', tage[x].datum: ' + tage[x].datum + ', eintragVorher: ' + eintragVorher); TODO nur test
            // Normaler Eintrag
            if (i == momentTag && eintragVorher != momentTag) {
                tagZeile(x);
                eintragVorher = momentTag;
                eintrag = true;
                delete tage[x];
                break;
            // Sondereintrag
            } else if (momentTag == eintragVorher) {
                seVorhanden = true;
                eintrag = true;
                sonderZeile(x);
                delete tage[x];
                break;
            }
        }
        // Leerer Eintrag wenn davor nichts eingetragen wurde
        if (eintrag == false) {
            html += '<tr><th scope="row">' + i + '</th><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
        }
    }
    // Wiedergeben der Tabelle
    $('#eaText').html(html + '</tbody></table>');
    // Tabelle für Sondereinträge
    let sonderEintrag = '<h3 style="text-align:center;">Sondereinträge</h3>';
    sonderEintrag += '<table class="table table-bordered table-sm" style="width:100%;"><thead><tr>';
    sonderEintrag += '<th style="width:20%" scope="col">Tag</th>';
    sonderEintrag += '<th style="width:20%" scope="col">Beginn</th>';
    sonderEintrag += '<th style="width:20%" scope="col">Ende</th>';
    sonderEintrag += '<th style="width:20%" scope="col">Arbeitszeit</th>';
    sonderEintrag += '<th style="width:20%" scope="col">Gehalt</th></tr></thead><tbody>';
    sonderEintrag += sonderRow;
    // Wenn die Tabelle Sondereinträge nicht leer ist diese wiedergeben
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

$(document).ready(function() {

    // INDEX / EXPIRE
    if (window.location.hash == '#expire') { // TODO auch per js (callback .done bei $.ajax)?
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
        console.log('preventdefault'); // TODO TEST
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
        .fail(function() {
            $('#atext').html('<h3>Anfrage fehlgeschlagen</h3><br><h5>Bitte <a href="mailto:bergen@starcar.de">Ole Bergen</a> kontaktieren</h5>')
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
            console.log(daten);
            eatabelle();
        })
        .fail(function() {
            $('#eaText').html('<h3>Anfrage fehlgeschlagen</h3><br><h5>Bitte <a href="mailto:bergen@starcar.de">Ole Bergen</a> kontaktieren</h5>')
        })
    });

    // für jeden input Datum - automatisch Datum heute
    document.getElementById('datum').valueAsDate = new Date();

    // EINTRAGEN
    $('#eform').change(function() {
        $('#esend').hide();
    })
});

// autocomplete
$(document).ajaxComplete(function() {
    $('#nameInput').autoComplete({
        minChars: 1,
        delay: 0, // TODO 150 für weniger laden?
        source: function(term, suggest){
            term = term.toLowerCase();
            var matches = [];
            for (i=0; i<choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
            suggest(matches);
        }
    })
});
