/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['dist'],
  resolver: 'jest-ts-webcompat-resolver',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'index.ts',
    'app.ts',
    'router',
    'error.ts',
    'db.connect',
    'config',
    'model',
    'schema.ts',
    'interfaces.ts',
    'express.server.ts',
    'socket.server.ts'
  ],
};