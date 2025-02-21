import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, DocumentNode } from '@apollo/client';
import { print } from 'graphql';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { getToken } from '../utils/get-token';

const graphqlApiUrl = import.meta.env.DEV ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_PROD_API_URL;

const projectToken = import.meta.env.VITE_PROJECT_TOKEN;

interface PersistedDocumentNode extends DocumentNode {
  __meta__?: {
    hash: string;
  };
}

if (!projectToken) {
  console.warn('⚠️ Warning: VITE_PROJECT_TOKEN is not set in .env file');
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = createHttpLink({
  uri: `${graphqlApiUrl}/graphql`,
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      ...(projectToken ? { 'X-Project-Token': projectToken } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

// its work fine when we use backend with apollo server.
const persistedQueriesLink = createPersistedQueryLink({
  sha256,
  useGETForHashedQueries: true,
});

// codegen will need to handle "__meta__.hash" field as well, so we need to manually move this field to under document using script - WIP
// const persistedQueriesLink = createPersistedQueryLink({
//   generateHash: (document: DocumentNode) => {
//     console.log(document);
//     const persistedDocument = document as PersistedDocumentNode;
//     if (persistedDocument.__meta__?.hash) {
//       return persistedDocument.__meta__.hash;
//     }
//     return sha256(print(document)).then((hash) => hash);
//   },
// });

const client = new ApolloClient({
  connectToDevTools: import.meta.env.DEV,
  link: ApolloLink.from([errorLink, authLink, persistedQueriesLink, httpLink]),
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined', // Disable SSR mode for Apollo
});

export default client;
