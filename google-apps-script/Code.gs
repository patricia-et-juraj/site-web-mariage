/**
 * RSVP → Google Sheets
 *
 * 1. Créez une Google Sheet (sheets.new) — ex. « RSVP Mariage »
 * 2. Extensions → Apps Script → collez ce fichier → Enregistrer
 * 3. Déployer → Nouveau déploiement → Type « Application web »
 *    - Exécuter en tant que : Moi
 *    - Qui a accès : Tout le monde
 * 4. Copiez l’URL se terminant par /exec dans js/config.js → rsvp.googleScriptUrl
 * 5. Partagez la feuille avec Patricia & Juraj (app Google Sheets sur téléphone)
 */

var SHEET_NAME = "RSVP";

var HEADERS = [
  "Horodatage",
  "Nom",
  "Email",
  "Présence",
  "Nombre de personnes",
  "Navette",
  "Régime / allergies",
  "Message",
  "Langue du site",
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);

  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();
    ensureHeaders_(sheet);

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      formatAttendance_(data.attendance),
      data.guests || "",
      data.shuttle || "",
      data.dietary || "",
      data.message || "",
      data.locale || "",
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
}

function formatAttendance_(value) {
  if (value === "yes") return "Oui";
  if (value === "no") return "Non";
  return value || "";
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
