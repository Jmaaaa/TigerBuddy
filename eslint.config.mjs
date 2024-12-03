import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginNode from "eslint-plugin-node";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { 
    globals: {
      ...globals.browser, 
      ...globals.node,
    },
  },
},
  pluginNode.configs.recommended, 
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];