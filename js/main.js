moment.locale('de')

let choices, loehne, kennung, name, datum, beginnForm, endeForm, diffMinuten, gehalt;

// objekt für namen (choices) und löhne aus getdata.php
$.get("../scripts/getdata.php", function(data){
    let result = JSON.parse(data); // TODO schon JSON? warum gehts dann? test mit console.log was da aus getdata rauskommt (string aus encode -> parse zu json?), geht choices = data.namen?
    choices = result.namen;
    loehne = result.loehne;
});

// eintragen/index.php an DB senden
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
            sgehalt: gehalt,
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

// TODO als const deklarieren? https://dmitripavlutin.com/6-ways-to-declare-javascript-functions/
function berechnung() {
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
    beginnForm = moment(beginn).format('HH:mm'); // TODO "beginn" austauschen und variable beginn nennen? alle austauschen!
    $('#etext').append("<p><strong>Beginn:</strong> " + beginnForm + "</p>\n");

    let ende = moment($('#ende').val(), 'HH:mm');
    endeForm = moment(ende).format('HH:mm'); // TODO "ende" austauschen und variable ende nennen? alle austauschen!
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

    // Berechnung Gehalt
    if (wochentag == 7) {
        lohn = sonlohn;
    } else if (wochentag == 6) {
        lohn = samlohn;
    } else {
        lohn = norlohn;
    }
    gehalt = lohn / 60 * diffMinuten;
    $('#etext').append("<p><strong>Gehalt:</strong> " + gehalt.toFixed(2) + "€</p>\n");
    
    // TODO moment().toJSON(); für sql?
};

$(document).ready(function() {

    // index.php bei expire
    if (window.location.hash == '#expire') { // TODO auch per js (callback .done bei $.ajax)?
        $('#expAlert').show();
        history.replaceState(null, null, ' ');
    }

    // eintragen/index.php
    $('#eform').submit(function(e) {
        e.preventDefault();
        $('#esend').show();
        berechnung();
    })

    // für jeden input Datum - automatisch Datum heute
    document.getElementById('datum').valueAsDate = new Date();

    // eintragen/index.php 
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