module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        'plugin:react/jsx-runtime',
    ],
    parserOptions: {
        ecmaVersion: 'next',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        'react/prop-types': 0,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
