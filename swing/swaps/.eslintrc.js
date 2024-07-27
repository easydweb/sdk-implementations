/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint-config-examples/index.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
