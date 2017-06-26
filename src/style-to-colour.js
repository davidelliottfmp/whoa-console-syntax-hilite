const fs = require("fs");
const css = require("css");
const getInstalledPath = require("get-installed-path");
const parse = require("parse-color");

function generateHTMLToConsoleConversionTable(cssObject) {
  var lookupObject = [];
  cssObject.stylesheet.rules.forEach(rule => {
    if (rule.type == "rule") {
      rule.declarations.forEach(declaration => {
        if (declaration.property == "color") {
          rule.selectors.forEach(cssName => {
            const splitNames = cssName.split(" ");
            splitNames.forEach(splitCssName => {
              const rgbArray = parse(declaration.value).rgb;
              const fixedRgbArray = rgbArray == undefined
                ? [255, 255, 255]
                : rgbArray;
              lookupObject.push({
                name: `<span class="${splitCssName.substr(1)}">`,
                value: fixedRgbArray
              });
            });
          });
        }
      });
    }
  });
  return lookupObject;
}

function loadCssStyle(style) {
  const pathToStyle = _getPathToStyleFolder();
  const path = `${pathToStyle}/${style}.css`;
  if (fs.existsSync(path)) {
    const cssFileContents = fs.readFileSync(path, "utf8");
    return cssFileContents && css.parse(cssFileContents, {});
  }
  console.log(`failed to load file ${path}\n`);
  return undefined;
}

function _getPathToStyleFolder() {
  const path = getInstalledPath.sync("highlight.js", {
    local: true
  });
  return path + "/styles";
}

module.exports = {
  loadCssStyle,
  generateHTMLToConsoleConversionTable
};
