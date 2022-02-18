module.exports = {
    moduleDirectories: ['node_modules', 'src'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'],
    roots: ['src'],
    testEnvironment: 'jest-environment-jsdom',
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
    },
    collectCoverageFrom: ['./src/**/*.{ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
};
