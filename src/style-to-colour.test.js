const { loadCssStyle } = require("./style-to-colour");

test("given an existing style returns the style", () => {
  const cssStyle = loadCssStyle("darcula");
  expect(cssStyle).toBeDefined();
});
test("given an invalid style returns undefined", () => {
  const cssStyle = loadCssStyle("ijustdontexistinthestyles");
  expect(cssStyle).toBeUndefined();
});
