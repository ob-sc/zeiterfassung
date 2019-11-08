<?php
require "../req/session.php";
$titel = "Hilfe";
include "../req/header.php";
?>

<div class="container border">
  <div class="display-2">Inhalt</div>
    <ul class="list-unstyled" style="margin-bottom:250px">
      <li class="display-4"><a href="#anmelden">Anmelden</a></li>
      <li class="display-4"><a href="#eintragen">Eintragen</a></li>
      <li class="display-4"><a href="#arbeitszeitnachweis">Arbeitszeitnachweis</a></li>
      <li class="display-4"><a href="#abrechnung">Abrechnung</a></li>
      <li class="display-4"><a href="#aushilfen">Aushilfen</a></li>
      <li class="display-4"><a href="#mitarbeiter">Mitarbeiter</a></li>
      </ul>
  <div class="display-4" id="anmelden">Anmelden</div>
  <div class="readmeText"><br>
    <p>Jeder festangestellte Disponent muss sich seinen Account selber erstellen (auf dem Link <i>registrieren</i>).</p>
    <p>Nachdem ein Account erstellt wurde, muss dieser von dem Stationsleiter bestätigt werden. Der Stationsleiter hat einen extra Account.</p>
    <p><strong>Dieser muss von der Personalabteilung als solcher eingetragen werden, also müsst ihr dort Bescheid geben, wenn der SL-Account erstellt wurde!</strong></p>
    <p>Der Account des Stationsleiters ist zusätzlich dazu berechtigt eine Monatsabrechnung für das Steuerberater-Büro Kehler durchzuführen, die Löhne der Aushilfen einzusehen und zu bearbeiten, 
    neue Aushilfen anzulegen, sowie die Mitarbeiter zu bestätigen.</p>
    <p><strong>Wichtig: Speichert das Passwort für die Accounts nach Möglichkeit nicht in eurem Browser oder lasst das Passwort auf einem Zettel offen liegen, um unbefugten Zugriff auf die 
    Zeiterfassung zu vermeiden.</strong></p>
  </div>
  <div class="display-4" id="eintragen">Eintragen</div>
  <div class="readmeText"><br>
    <p>Hier werden die Arbeitszeiten der Aushilfen eingetragen. Es gibt die folgenden Felder:</p>
    <ul>
      <li><strong>Aushilfe:</strong> Der Name der Aushilfe</li>
      <li><strong>Aus anderer Station:</strong> Aushilfe aus einer anderen Station ist im Feld <i>Aushilfe</i> auswählbar</li>
      <li><strong>Datum:</strong> Das Datum des Arbeitstages</li>
      <li><strong>Beginn:</strong> Beginn der Schicht</li>
      <li><strong>Ende:</strong> Ende der Schicht</li>
      <li><strong>OK:</strong> Dieser Knopf öffnet die Vorschau auf der rechten Seite</li>
    </ul>
    <p><strong>Vorschau:</strong> Hier werden die eingegebenen Daten, sowie die Arbeitszeit und das Gehalt angezeigt.</p>
    <p><strong>Überprüfe die Daten bevor du auf <i>Senden</i> klickst!</strong></p>
    <p>Nach Klick auf <i>Senden</i> erscheint die Nachricht <i>Eintrag erfolgreich!</i></p>
  </div>
  <div class="display-4" id="arbeitszeitnachweis">Arbeitszeitnachweis</div>
  <div class="readmeText"><br>
    <p>Eine Übersicht aller Schichten der Aushilfe im gewählten Monat.</p>
    <p>Wenn es an einem Tag mehrere Einträge gibt, dann wird diese Zeit unter der Tabelle als <i>Sondereintrag</i> aufgeführt.</p>
    <p>Schichten in einer anderen Station werden gelb hinterlegt.</p>
    <p>Diese Seite lässt sich auf dem <i>Drucken</i>-Knopf ausdrucken.</p>
  </div>
  <div class="display-4" id="abrechnung">Abrechnung</div>
  <div class="readmeText"><br>
    <p><strong>Nur für Stationsleiter</strong></p>
    <p>Die Abrechnung für den ausgewählten Abrechnungszeitraum.</p>
    <p>Schichten einer Aushilfe aus einer anderen Station werden gelb hinterlegt.</p>
    <p>Die Felder bedeuten:</p>
    <ul>
      <li><strong>PN:</strong> Personalnummer</li>
      <li><strong>Name:</strong> Name der Aushilfe</li>
      <li><strong>AZ:</strong> Arbeitszeit</li>
      <li><strong>Gehalt:</strong> Gehalt für diesen Monat</li>
      <li><strong>Tage:</strong> Arbeitstage für diesen Monat</li>
      <li><strong>Urlaub: Urlaubstage insgesamt für das gesamte Jahr (nicht nur Abrechnungszeitraum)</strong></li>
      <li><strong>Status:</strong> Maximaler Verdienst (450 o. a.)</li>
      <li><strong>Abmelden:</strong> Datum der Abmeldung <strong>(immer mit Datum)</strong></li>
    </ul>
    <p>Die Tabelle wird auf dem Knopf <i>Speichern</i> als PDF gespeichert. Überprüfe sie auf mögliche Fehler und schicke sie dann per Mail an <a href="mailto:starcarlohn@steuerberater-kehler.de">
    starcarlohn@steuerberater-kehler.de</a>.</p>
  </div>
  <div class="display-4" id="aushilfen">Aushilfen</div>
  <div class="readmeText"><br>
    <p><strong>Nur für Stationsleiter</strong></p>
    <p>Hier findest du eine Übersicht über alle Aushilfen deiner Station.</p>
    <p>Löhne lassen sich per Klick auf das Stift-Symbol bearbeiten.</p>
    <p><strong>Neu Anlegen</strong></p>
    <p>Hier kannst du Aushilfen neu anlegen.</p>
    <p>Wenn die Personalnummer nicht bekannt ist oder es noch keine gibt, lasse das Feld leer.</p>
    <p>Achte auf die richtige Schreibweise des Namens, dieser kann später nur von der Personalabteilung bearbeitet werden.</p>
    <p><strong>Personalnummern</strong></p>
    <p>Hier kannst du Aushilfen neu anlegen.</p>
    <p>Wenn eine Aushilfe vom Stationsleiter angelegt wird, gibt es nicht immer direkt auch eine Personalnummer für diese. 
    Sobald ihr die vom Steuerberater-Büro Kehler erhaltet könnt ihr diese hier eintragen.</p>
  </div>
  <div class="display-4" id="mitarbeiter">Mitarbeiter</div>
  <div class="readmeText"><br>
    <p><strong>Nur für Stationsleiter</strong></p>
    <p>Hier kann der Stationsleiter die Mitarbeiter-Accounts seiner Station einsehen.</p>
    <p>Wenn ein Mitarbeiter einen Account erstellt, muss dieser vom Stationsleiter bestätigt werden, 
    damit nur Mitarbeiter aus dieser Station Zugriff auf die Zeiten der jeweiligen Aushilfen haben.</p>
    <p>Überprüfe auch die Namen der Mitarbeiter. Wer einen Account erhält, entscheidet der Stationsleiter, 
    d. h. falls jemand in der Probezeit keine Zeiten eintragen soll, muss dieser nicht bestätigt werden.</p>
  </div>
</div>
