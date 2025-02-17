// babel.config.js
export const presets = [
  [
    '@babel/preset-env',
    {
      // Transpile modules to CommonJS for Jest compatibility.
      modules: 'commonjs',
    },
  ],
  '@babel/preset-react',
  '@babel/preset-typescript', // Add this if you use TypeScript
];