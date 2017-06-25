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

const path = getInstalledPath.sync('highlight.js', {
  local: true,
});
console.log(path);

// <span> </span>

//
//
// Reset = "\x1b[0m"
// Bright = "\x1b[1m"
// Dim = "\x1b[2m"
// Underscore = "\x1b[4m"
// Blink = "\x1b[5m"
// Reverse = "\x1b[7m"
// Hidden = "\x1b[8m"
//
// FgBlack = "\x1b[30m"
// FgRed = "\x1b[31m"
// FgGreen = "\x1b[32m"
// FgYellow = "\x1b[33m"
// FgBlue = "\x1b[34m"
// FgMagenta = "\x1b[35m"
// FgCyan = "\x1b[36m"
// FgWhite = "\x1b[37m"
//
// BgBlack = "\x1b[40m"
// BgRed = "\x1b[41m"
// BgGreen = "\x1b[42m"
// BgYellow = "\x1b[43m"
// BgBlue = "\x1b[44m"
// BgMagenta = "\x1b[45m"
// BgCyan = "\x1b[46m"
// BgWhite = "\x1b[47m"

// black
// red
// green
// yellow
// blue (on Windows the bright version is used as normal blue is illegible)
// magenta
// cyan
// white
// gray
