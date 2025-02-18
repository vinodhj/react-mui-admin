import type { Config } from '@jest/types';

export const preset = 'ts-jest';
export const testEnvironment = 'jest-environment-jsdom';

export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testTimeout: 30000,
    setupFilesAfterEnv: ['./setupTests.ts'],
    testEnvironment,
    preset,
    testPathIgnorePatterns: [],
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
      '\\.svg$': '<rootDir>/__mocks__/svgMock.tsx',
    },
    reporters: [
      'default',
      [
        'jest-html-reporters',
        {
          publicPath: './jest-report',
          inlineSource: true,
          hideIcon: true,
          expand: true,
        },
      ],
    ],
  };
};
