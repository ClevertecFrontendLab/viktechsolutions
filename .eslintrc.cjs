module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        "plugin:react/recommended",
        "plugin:import/warnings"
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'stylelint.config.cjs', 'coverage'],
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
            "typescript": {
                "alwaysTryTypes": true
            }
        }
    },
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        "react/react-in-jsx-scope": "off",
        'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
        "react/jsx-first-prop-new-line": ["warn", "multiline"],
        "react/jsx-max-props-per-line": ["warn", {"maximum": 1}],
        "space-before-blocks": [
            "error",
            "always"
        ],
        "no-var": "error",
        "vars-on-top": "warn",
        "no-multiple-empty-lines": [
            "warn",
            {
                "max": 1,
                "maxEOF": 0
            }
        ],
        "padding-line-between-statements": [
            "error",
            {
                "blankLine": "always",
                "prev": "block-like",
                "next": "*"
            }
        ],
        "object-curly-spacing": [
            "error",
            "always",
            {
                "objectsInObjects": false
            }
        ],
        "no-unused-vars": "warn",
        "prefer-const": "error",
        "no-console": "warn",
        "quotes": [
            "warn",
            "single"
        ],
        "jsx-quotes": [
            "warn",
            "prefer-double"
        ],
        "indent": [
            "warn",
            2
        ],
        "comma-dangle": [
            "error",
            "always-multiline"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "import/order": [
            "warn",
            {
                "groups": [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index"
                ],
                "newlines-between": "always",
                "pathGroups": [
                    {
                        "pattern": "@/**",
                        "group": "builtin",
                        "position": "before"
                    }
                ]
            }
        ],
        "no-new-wrappers": "error",
        "no-throw-literal": "error",
        "import/no-unresolved": "off",
        "newline-before-return": "warn",
        "newline-after-var": "warn"
    },
};
