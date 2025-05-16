#  ESLint Configuration pour un Projet JavaScript (avec `eslint.config.js`)

Ce projet utilise une configuration moderne et modulaire d'ESLint basée sur `eslint.config.js`, compatible avec ESLint v9+. Cette configuration permet de :

-  Appliquer les bonnes pratiques JavaScript recommandées
-  Appliquer des conventions strictes de nommage (camelCase)
-  Gérer l'environnement navigateur et Node.js
-  Interdire les fichiers mal nommés ou dossiers non conformes
-  Structurer et maintenir un code propre

---

## 🔧 Installation des dépendances

Installez les paquets nécessaires avec :

```bash
npm install --save-dev eslint @eslint/js eslint-plugin-check-file globals
```

---

##  Structure du fichier `eslint.config.js`

```js
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
```

---

##  Explication détaillée

###  @eslint/js
Importe les règles de base recommandées pour JavaScript pur (`js/recommended`).

###  globals
Ajoute la prise en charge des variables globales pour les environnements **navigateur** et **Node.js**.

###  defineConfig
Permet de définir une configuration modulaire et propre pour ESLint v9+.

###  eslint-plugin-check-file
Plugin utilisé pour appliquer des conventions strictes de nommage de fichiers et dossiers.

###  ignore
Ignore les dossiers générés automatiquement comme :
- `node_modules`
- `dist`
- `build`
- le fichier de config lui-même (`eslint.config.js`)

### Règles importantes appliquées

- `"camelcase"` : interdit les noms de variables qui ne respectent pas `camelCase`
- `"prefer-const"` : impose l’usage de `const` si la variable n’est pas réassignée
- `"id-match"` : applique un regex pour forcer le style camelCase pour les noms d'identifiants
- `"new-cap"` : impose que les fonctions construites via `new` commencent par une majuscule
- `"check-file/filename-naming-convention"` : force les noms de fichiers `.js/.jsx` à être en camelCase
- `"check-file/folder-naming-convention"` : force les noms de dossiers à être en camelCase

---

##  Exemple de code valide

```js
const myVariable = 10;

function doSomethingUseful() {
  const result = myVariable * 2;
  return result;
}

class MyClass {}
```

---

##  Exemple de code invalide

```js
const My_variable = 10; //  camelCase non respecté

function DoSomething() {} //  PascalCase utilisé au lieu de camelCase

class my_class {} //  Nom de classe non en PascalCase
```

---

##  Exemple de structure de projet attendue

```
src/
  myFolder/            camelCase
    myFile.js         camelCase
    MyComponent.jsx    interdit
  index.js            interdit (index.js/index.ts à éviter si règle activée)
```

---

##  Lancement d'ESLint

```bash
npx run lint
```

---

## 📘 Ressources

- [Documentation ESLint](https://eslint.org/docs/latest)
- [eslint-plugin-check-file](https://github.com/hyperjumptech/eslint-plugin-check-file)
- [Globals](https://github.com/sindresorhus/globals)
