const axios = require("axios");
const fs = require("fs");
const prompt = require("prompt-sync")();
const path = __dirname + "/TextoConvertido.txt";

function wikipediaExtract(language, title) {
  const endpoint = `http://${language}.wikipedia.org/w/api.php`;
  const params =
    "?action=query" +
    "&prop=extracts" +
    `&titles=${title}` +
    "&explaintext=1" +
    "&format=json" +
    "&formatversion=2";

  const link = endpoint + params;

  async function getResponse(url) {
    var response = await axios.get(url);
    return (
      response.data.query.pages[0].title +
      "\n\n" +
      response.data.query.pages[0].extract
    );
  }

  return getResponse(link);
}

function fileWriter(filePath, text) {
  fs.writeFile(filePath, text, function (error) {
    if (error) {
      console.error("An error has occurred: " + error.message);
    } else {
      console.log("File successfully written to: " + filePath);
    }
  });
}

async function convertText() {
  const language = prompt(
    "Enter the language of the desired Wikipedia page (pt/en): "
  );
  const title = prompt(
    "Enter the title of the desired Wikipedia page (text after wiki/ in the URL): "
  );

  var apiOutput = await wikipediaExtract(language, title);
  fileWriter(path, apiOutput);
}

convertText();
