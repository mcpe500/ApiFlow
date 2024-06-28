module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
