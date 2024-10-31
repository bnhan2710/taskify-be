import { JestConfigWithTsJest, createDefaultPreset } from 'ts-jest';

const defaultPreset = createDefaultPreset();

const jestConfig: JestConfigWithTsJest = {

  ...defaultPreset,
  preset: 'ts-jest',
  
  testEnvironment: 'node',

  testMatch: [
    '**/__tests__/**/*.test.ts',    // Unit test
    '**/__tests__/**/*.e2e.ts',      // E2E test
  ],

  moduleFileExtensions: ['ts', 'js', 'json'],

  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  coverageDirectory: 'coverage',

  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/server.ts',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default jestConfig;
