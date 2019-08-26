moment.locale('de')

let choices, loehne, kennung, name, datum, beginnForm, endeForm, diffMinuten, gehalt, daten;

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
    // TODO zeilen zusammenfassen? (zb <thead> und <tr>)
    let html = '<h3 style="text-align:center">Monatsabrechnung ' + station + ', ' + moment($('#datum').val(), 'YYYY-MM').format('MMMM YYYY') + '</h3>\n';
    html += '<table class="table table-bordered" style="width:100%">\n';
    html += '<thead>\n';
    html += '<tr>\n';
    // th style="width:x%"
    html += '<th scope="col">PN</th>\n';
    html += '<th scope="col">Name</th>\n';
    html += '<th scope="col">Arbeitszeit</th>\n';
    html += '<th scope="col">Gehalt</th>\n';
    html += '<th scope="col">Tage</th>\n';
    html += '</tr>\n';
    html += '</thead>\n';
    html += '<tbody>\n';
    for (let x in daten) {
        let gehalt = daten[x].gehalt;
        if (daten[x].gehalt > 450) {
            html += '<tr class="table-danger">\n';
        } else {
            html += '<tr>\n';
        }
        html += '<th scope="row">' + daten[x].personalnr + '</th>\n';
        html += '<td>' + daten[x].name + '</td>\n';
        html += '<td>' + moment.utc().startOf('day').add(daten[x].arbeitszeit, 'minutes').format('HH:mm') + '</td>\n';
        html += '<td>' + gehalt.toFixed(2) + '</td>\n';
        html += '<td>' + daten[x].tage + '</td>\n';
        html += '</tr>';
    }
    $('#atext').html(html + '</tbody>\n</table>\n<input type="button" onclick="window.print();" value="Drucken" class="noPrint btn scc">');
}

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
