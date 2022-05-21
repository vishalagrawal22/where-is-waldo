const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },
};

module.exports = config;
