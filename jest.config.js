/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  setupFiles: ["<rootDir>/test/jest.setup.ts"],
  testTimeout: 30000,
  moduleFileExtensions: ["ts", "tsx", "js"]
};