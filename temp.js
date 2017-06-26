// @flow
const { readFileSync } = require("fs");

const framer = require("code-frame");

function whoaCodeFrameSync(
  sourceCodeFileName: string,
  surroundingLines: number,
  line: number,
  col: number = 0
) {
  const sourceFileContents = readFileSync(sourceCodeFileName, "utf8");
  return framer(sourceFileContents, line, col, {
    frameSize: surroundingLines,
    tabSize: 2
  });
}

module.export = { whoaCodeFrameSync };

console.log(whoaCodeFrameSync("src/index.js", 7, 10, 5));
console.log(whoaCodeFrameSync("src/index.js", 7, 10));

/**
 * Apply syntax highlighting to `code` with ASCII color codes. The language is automatically
 * detected if not set.
 *
 * ```ts
 * import {highlight} from 'cli-highlight';
 * import * as fs from 'fs';
 *
 * fs.readFile('package.json', 'utf8', (err: any, json: string) => {
 *     console.log('package.json:');
 *     console.log(highlight(json));
 * });
 * ```
 *
 * @param code The code to highlight
 * @param options Optional options
 */
