const config = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules"],
  testMatch: ['**/*.test.js'],
  verbose: true,
  preset: "@shelf/jest-mongodb",
};

module.exports = config;
