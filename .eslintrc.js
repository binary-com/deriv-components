module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
        // For disabling react/react-in-jsx-scope
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
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
