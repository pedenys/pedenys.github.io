---
title: Node CMS with Google Sheet
date: april 2019
---

When one has nothing but wits and bare essentials.

⚠️ I don't remember if I wrote it or if I found it in a lib.

```js
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const util = require("util");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const TOKEN_PATH = "./.google/token.json";
const spreadsheetId = "SPREAD_SHEET_ID";
const spreadsheetRange = "Translate";

const OUT_PATH = "./src/assets/i18n/";

let translations = [];
let index = "";
const exist = testPath(OUT_PATH);

// Make the directory if it doesn't exist
if (!exist) {
  fs.mkdirSync(OUT_PATH);
}

// Load client secrets from a local file.
fs.readFile("./.google/credentials.json", (err, content) => {
  if (err) return console.error("Error loading client secret file:", err);
  authorize(JSON.parse(content), readTranslations);
});

/**
 * Test if the directory exist
 * @param {string} path
 */
function testPath(path) {
  try {
    fs.accessSync(path);
  } catch (err) {
    return false;
  }
  return true;
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err,
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Read the sheet having the translations
 * @param {google.auth.OAuth2} auth credentials needed for reading spreadsheet
 */
function readTranslations(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: spreadsheetId,
      range: spreadsheetRange,
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const rows = res.data.values;
      if (rows.length) {
        let rowLngs = rows[0];
        let countries = [];
        for (let iLng = 0; iLng < rowLngs.length; iLng++) {
          if (rowLngs[iLng] !== "") {
            countries.push(extractCountry(rowLngs[iLng]));
          }
        }
        // Filter unique country
        countries = countries.filter((v, i, a) => a.indexOf(v) === i);
        initFiles(countries);
        for (let iLng = 0; iLng < rowLngs.length; iLng++) {
          if (rowLngs[iLng] !== "") {
            processTransltation(rows, rowLngs[iLng], iLng);
          }
        }
      } else {
        console.log("No data found.");
      }
    },
  );
}

/**
 * Process the translation for  specific language
 * @param {string[][]} data
 * @param {string} lng language ( first row )
 * @param {number} iLng index of the language ( col number )
 */
function processTransltation(data, lng, iLng) {
  // loop on each lines of the sheet, excluding the first one
  const lng_country = extractCountry(lng);
  for (let iData = 1; iData < data.length; iData++) {
    let tKey = data[iData][0];
    let tValue = data[iData][iLng] ? data[iData][iLng] : "";
    if (tKey) {
      addTranslationKey(lng_country, tKey, tValue);
    }
  }

  // dump the translation into file
  dumpTranslationTs(lng);
}

function extractCountry(lng) {
  return lng.split("_")[0] || "";
}

/**
 * add a translation in the object
 * * split the key if needed
 * @param {string} lng
 * @param {string} key
 * @param {string} value
 */
function addTranslationKey(lng, key, value) {
  if (!translations[lng]) {
    translations[lng] = {};
  }
  let translation = translations[lng];

  let keys = key.split("/");
  keys.reduce(function (dir, path, i, arr) {
    if (dir[path]) {
      return dir[path];
    }
    if (i < arr.length - 1) {
      dir[path] = {};
    } else {
      dir[path] = value;
    }
    return dir[path];
  }, translation);
}
/**
 * Initializes all TS files for each languag
 * @param {array} countries
 */
function initFiles(countries) {
  for (let i = 0; i < countries.length; i++) {
    fs.writeFileSync(
      `${OUT_PATH}/${countries[i]}.ts`,
      "/* tslint:disable */",
      "utf-8",
    );
    //add all
    index += `export * from './${countries[i]}';\n`;
  }
}

/**
 * Dump a translation object to a TS file
 * @param {string} lng language to dump
 */
function dumpTranslationTs(lng) {
  fs.appendFileSync(
    `${OUT_PATH}/${extractCountry(lng)}.ts`,
    `export const ${lng} = ` +
      util.inspect(translations[extractCountry(lng)], { depth: Infinity }) +
      ";\r\n",
    "utf-8",
  );
  //create the index file in directory
  fs.writeFileSync(`${OUT_PATH}/index.ts`, index);
}
```
