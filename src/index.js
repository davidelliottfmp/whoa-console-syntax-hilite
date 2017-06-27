const hljs = require("highlight.js");
const fs = require("fs");
const he = require("he");
const htmlparser = require("htmlparser2");

const {
  loadCssStyle,
  generateHTMLToConsoleConversionTable
} = require("./style-to-colour");

const sourceFile = fs.readFileSync("src/index.js", "utf8");
var htmlString = hljs.highlight("js", sourceFile).value;
console.log(htmlString);
const cssObject = loadCssStyle("darcula");
const conversionTable = generateHTMLToConsoleConversionTable(cssObject);
const terminalString = walkDomAndConvert(htmlString, conversionTable);
console.log(terminalString);

function walkDomAndConvert(htmlString, colourTable) {
  var colours = [];

  var outputString = "";
  var parser = new htmlparser.Parser(
    {
      onopentag: function(name, attribs) {
        if (name === "span") {
          const colour = conversionTable[attribs.class];
          const validatedColour = colour ? colour : [255, 255, 255];
          colours.push(validatedColour);
          outputString = outputString + terminalColor(validatedColour);
        }
      },
      ontext: function(text) {
        outputString = outputString + text;
      },
      onclosetag: function(tagname) {
        if (tagname === "span") {
          colours.pop();
          const poppedColour = colours.slice(-1).pop();
          const colour = poppedColour ? poppedColour : [255, 255, 255];
          outputString = outputString + terminalColor(colour);
        }
      }
    },
    { decodeEntities: true }
  );
  parser.write(htmlString);
  parser.end();
  return outputString;
}

function terminalColor(colour) {
  return "\x1b" + "[38;2;" + `${colour[0]};${colour[1]};${colour[2]}m`;
}

conversionTable.forEach(({ name, value }) => {
  htmlString = htmlString
    .split(name)
    .join("\x1b" + "[38;2;" + `${value[0]};${value[1]};${value[2]}m`);
});

htmlString = htmlString.split("</span>").join("\x1b[0m");
htmlString = htmlString.replace(/<span class="[a-z,-]*">/gm, "");
const unescapedHtmlString = he.unescape(htmlString);

console.log(unescapedHtmlString);
