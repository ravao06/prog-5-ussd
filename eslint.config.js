import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import checkFile from "eslint-plugin-check-file";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    files: ["**/*.{js,mjs,cjs}"],
  },
  {
     ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
            "eslint.config.js",
        ],
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "no-undef": "warn",
      camelcase: "error",

      "check-file/folder-naming-convention": [
        "error",
        {
          "**/": "CAMEL_CASE",
        },
      ],
      "prefer-const": "error",
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{js,jsx}": "CAMEL_CASE",
        },
      ],

      "id-match": [
        "error",
        "^[a-z][a-zA-Z0-9]*$",
        {
          onlyDeclarations: true,
          properties: false,
        },
      ],

      "new-cap": [
        "error",
        {
          newIsCap: true,
          capIsNew: false,
        },
      ],
      "no-unused-vars": "warn",
    },
  },
]);
