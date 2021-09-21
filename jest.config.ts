import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '\\.(s?css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest/jestSetup.ts'],
};

export default config;
