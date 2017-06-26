const hljs = require("highlight.js");
const fs = require("fs");
const he = require("he");
const {
  loadCssStyle,
  generateHTMLToConsoleConversionTable
} = require("./style-to-colour");

const sourceFile = fs.readFileSync("src/index.js", "utf8");
var htmlString = hljs.highlight("js", sourceFile).value;

const cssObject = loadCssStyle("darcula");
const conversionTable = generateHTMLToConsoleConversionTable(cssObject);

function walkDomAndConvert() {}

conversionTable.forEach(({ name, value }) => {
  htmlString = htmlString
    .split(name)
    .join("\x1b" + "[38;2;" + `${value[0]};${value[1]};${value[2]}m`);
});

htmlString = htmlString.split("</span>").join("\x1b[0m");
htmlString = htmlString.replace(/<span class="[a-z,-]*">/gm, "");
const unescapedHtmlString = he.unescape(htmlString);

console.log(unescapedHtmlString);
