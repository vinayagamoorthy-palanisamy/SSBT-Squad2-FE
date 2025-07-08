// jest.config.js
module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
   moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    "/node_modules/(?!react-dnd|react-dnd-html5-backend)"
  ],
};
