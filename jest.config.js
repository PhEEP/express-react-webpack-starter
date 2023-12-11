// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src/frontend"],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "identity-obj-proxy",
  },
}
