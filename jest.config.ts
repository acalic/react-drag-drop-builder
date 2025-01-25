import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }], // Use ts-jest to process TypeScript files
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS imports
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.ts', // Mock image imports
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Setup testing library
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
