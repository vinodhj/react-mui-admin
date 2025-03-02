import { ApolloClient, ApolloLink, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from '../../utils/get-token';
import { cache } from './cache-config';
import apolloErrorLink from './error-link';

// Environment variables
const graphqlApiUrl = import.meta.env.DEV ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_PROD_API_URL;
const projectToken = import.meta.env.VITE_PROJECT_TOKEN;

// Check for required environment variables
const requiredEnvVars = ['VITE_PROJECT_TOKEN', 'VITE_DEV_API_URL', 'VITE_PROD_API_URL', 'VITE_SIGNOUT_CHECK_INTERVAL_MINUTES'];
const missingVars = requiredEnvVars.filter((varName) => !import.meta.env[varName]);
if (missingVars.length > 0) {
  const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`;
  if (!import.meta.env.DEV) throw new Error(errorMessage);
  console.error(`⚠️ ${errorMessage}`);
}

const errorLink = apolloErrorLink();

const httpLink = createHttpLink({
  uri: `${graphqlApiUrl}/graphql`,
  credentials: 'include',
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

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  connectToDevTools: import.meta.env.DEV,
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache,
  ssrMode: typeof window === 'undefined', // Disable SSR mode for Apollo
  queryDeduplication: true,
  name: 'admin-client',
  version: '1.0',
});

export default client;
