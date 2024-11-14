// jest.config.mjs
export default {
  transform: {},
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1' // Helps Jest understand path imports without .js
  }
};
