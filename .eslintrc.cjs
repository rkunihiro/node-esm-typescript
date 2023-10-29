/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    env: {
        es2022: true,
        node: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    plugins: [
        //
        "@typescript-eslint",
        "import",
        "unicorn",
    ],
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
            },
            node: true,
        },
    },
    extends: [
        //
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        // "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:unicorn/recommended",
        "prettier",
    ],
    rules: {
        camelcase: [
            "warn",
            {
                properties: "always",
                ignoreDestructuring: true,
                ignoreImports: true,
                ignoreGlobals: true,
            },
        ],
        "class-methods-use-this": "error",
        curly: "error",
        "default-case": "error",
        eqeqeq: "error",
        "func-style": ["error", "declaration", { allowArrowFunctions: true }],
        "no-console": "warn",

        "@typescript-eslint/no-import-type-side-effects": "error",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

        // --------------------------------------------------
        // Import rules
        // https://github.com/import-js/eslint-plugin-import
        // --------------------------------------------------
        "import/newline-after-import": ["error", { count: 1, exactCount: true, considerComments: true }],
        "import/no-deprecated": "warn",
        "import/no-default-export": "warn",
        "import/no-duplicates": ["error", { "prefer-inline": true }],
        "import/order": [
            "error",
            {
                alphabetize: { order: "asc", orderImportKind: "asc", caseInsensitive: true },
                "newlines-between": "always",
            },
        ],

        // --------------------------------------------------
        // Unicorn rules
        // https://github.com/sindresorhus/eslint-plugin-unicorn
        // --------------------------------------------------
        "unicorn/filename-case": [
            "error",
            {
                cases: { camelCase: true, pascalCase: true },
            },
        ],
        "unicorn/prevent-abbreviations": [
            "error",
            {
                extendDefaultReplacements: true, // デフォルトのreplacementsを使用する
                replacements: {
                    props: false,
                },
                extendDefaultAllowList: true, // デフォルトのallowListを使用する
                allowList: {}, // 除外する識別子(完全一致)
                checkDefaultAndNamespaceImports: "internal",
                checkShorthandImports: "internal",
                checkShorthandProperties: false,
                checkProperties: false,
                checkVariables: true,
                checkFilenames: true,
                ignore: [],
            },
        ],
        "unicorn/template-indent": "off",
    },
    ignorePatterns: [
        //
        "dist/",
        "node_modules/",
    ],
};
