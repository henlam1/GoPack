const config = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  transformIgnorePatterns: ["node_modules"],
  testMatch: ["**/*.test.js"],
  verbose: true
};

module.exports = config;
