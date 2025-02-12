// babel.config.js
export const presets = [
  [
    '@babel/preset-env',
    {
      // This tells Babel to keep ES module syntax
      modules: false,
    },
  ],
  '@babel/preset-react',
];
