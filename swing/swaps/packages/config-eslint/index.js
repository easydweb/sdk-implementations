module.exports = {
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "eslint-config-turbo",
    "prettier",
  ],

  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "dist/",
    "build/",
    ".eslintrc.js",
    "**/*.css",
    "react-app-env.d.ts",
  ],
  globals: {
    React: true,
    JSX: true,
  },

  env: { browser: true, es6: true, node: true },

  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",

      extends: ["plugin:@typescript-eslint/recommended"],
      plugins: ["unused-imports"],

      rules: {
        "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",

        // Remove unused imports
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "error",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            argsIgnorePattern: "^_",
            args: "after-used",
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ],
};
