module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },

    setupFilesAfterEnv: [
      '@testing-library/jest-dom/extend-expect'
    ],

    testRegex: "(\\.|/)(spec)\\.(tsx?)$",

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    globals: {
      'ts-jest': {
        tsConfig: './tsconfig.jest.json',
        diagnostics: false
      }
    }
  };