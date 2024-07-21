import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import unicorn from "eslint-plugin-unicorn";
import typescript from "typescript-eslint";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    // js
    js.configs.recommended,

    // typescript
    ...typescript.configs.recommended,

    // unicorn
    unicorn.configs["flat/recommended"],

    // prettier
    prettier,

    // custom
    {
        rules: {
            "no-console": "warn",
            "no-unused-vars": "warn",

            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ],
        },
    },
];
