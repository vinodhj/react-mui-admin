import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';
dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    ['http://localhost:8500/graphql']: {
      headers: {
        'X-Schema-Federation': 'true',
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
    'src/graphql/apollo/type-policies-generated-helpers.ts': {
      plugins: ['typescript-apollo-client-helpers'],
      config: {
        useTypeImports: true,
        // Customize automatic key fields detection
        nonOptionalTypename: true,
        // For custom key fields beyond ID
        customKeyFields: {
          AdminKvAsset: ['kv_key'],
        },
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
