import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    ['http://localhost:7787/graphql']: {
      headers: {
        'X-Project-Token': process.env.VITE_PROJECT_TOKEN || '',
      },
    },
  },
  documents: 'src/**/*.graphql',
  generates: {
    'src/graphql/graphql-generated.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        scalars: {
          DateTime: 'string',
        },
        // This setting tells Codegen to merge inline fragments into a unified type.
        inlineFragmentTypes: 'combine',
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
