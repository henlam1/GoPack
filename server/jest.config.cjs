const config = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules"],
  testMatch: ['**/*.test.js'],
  verbose: true,
  preset: "ts-jest",
};

module.exports = config;
