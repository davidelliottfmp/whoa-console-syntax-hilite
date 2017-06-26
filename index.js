const hljs = require('highlight.js');
const fs = require('fs');
const css = require('css');
const he = require('he');
const getInstalledPath = require('get-installed-path');
const parse = require('parse-color');

const sourceFile = fs.readFileSync('index.js', 'utf8');
var htmlString = hljs.highlight('js', sourceFile).value;

const cssObject = loadStyle('darcula');
const conversionTable = generateHTMLToConsoleConversionTable(cssObject);

conversionTable.forEach(({ name, value }) => {
  htmlString = htmlString
    .split(name)
    .join('\x1b' + '[38;2;' + `${value[0]};${value[1]};${value[2]}m`);
});
htmlString = htmlString.split('</span>').join('\x1b[0m');
htmlString = htmlString.replace(/<span class="[a-z,-]*">/gm, '');
const unescapedHtmlString = he.unescape(htmlString);

console.log(unescapedHtmlString);

function generateHTMLToConsoleConversionTable(cssObject) {
  var lookupObject = [];
  cssObject.stylesheet.rules.forEach(rule => {
    if (rule.type == 'rule') {
      rule.declarations.forEach(declaration => {
        if (declaration.property == 'color') {
          rule.selectors.forEach(cssName => {
            const splitNames = cssName.split(' ');
            splitNames.forEach(splitCssName => {
              const rgbArray = parse(declaration.value).rgb;
              const fixedRgbArray = rgbArray == undefined
                ? [255, 255, 255]
                : rgbArray;
              lookupObject.push({
                name: `<span class="${splitCssName.substr(1)}">`,
                value: rgbArray
              });
            });
          });
        }
      });
    }
  });
  return lookupObject;
}

function replaceAllEndSpansWithReset(code) {
  return code.replace('</span>', '\x1b[0m');
}

function loadStyle(style) {
  const pathToStyle = _getPathToStyleFolder();
  const cssFileContents = fs.readFileSync(
    `${pathToStyle}/${style}.css`,
    'utf8'
  );
  return cssFileContents && css.parse(cssFileContents, {});
}

function _getPathToStyleFolder() {
  const path = getInstalledPath.sync('highlight.js', {
    local: true
  });
  return path + '/styles';
}
