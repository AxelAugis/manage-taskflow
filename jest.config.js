/** @type {import('jest').Config} */
const config = {
    verbose: true,
    preset: 'jest-expo',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
        'node_modules/(?!(expo[^/]*|react-native|@react-native|@react-native-community|@react-navigation)[/\\\\])',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    setupFiles: ['<rootDir>/jest.setup.js'],
    collectCoverage: true,
    collectCoverageFrom: [
        'app/**/*.{js,jsx,ts,tsx}',
    ],
    coverageReporters: ['json', 'lcov', 'text','clover', 'cobertura'],
    coverageDirectory: '<rootDir>/.coverage',
    reporters: ["default", ["jest-junit", { outputDirectory: ".coverage", outputName: "junit.xml" }]]
};

module.exports = config;
