const hljs = require('highlight.js');
const fs = require('fs');
const css = require('css');
const he = require('he');
const getInstalledPath = require('get-installed-path');

const sourceFile = fs.readFileSync('index.js', 'utf8');
const htmlString = hljs.highlight('js', sourceFile).value;

const unescapedHtmlString = he.unescape(htmlString);

console.log(unescapedHtmlString);
var obj = css.parse('body { font-size: 12px; }', {});
console.log(css.stringify(obj, {}));

console.log('\x1b[38;2;255;100;0mTRUECOLOR\x1b[0m\n');

const cssObject = loadStyle('dracula');
const conversionTable = generateHTMLToConsoleConversionTable(cssObject);
console.log(cssObject.stylesheet);

function generateHTMLToConsoleConversionTable(cssObject) {
  cssObject.stylesheet.rules.forEach(rule => {
    if (rule.type == 'rule') {
      rule.declarations.forEach(declaration => {
        if (declaration == 'color') {
          rule.selectors.forEach(cssName => {
            console.log(`<span class="${cssName}"> becomes `);
          });
          console.log('----------------------------');
          console.log(rule.declarations);
        }
      });
    }
  });
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
