import { ApolloClient, ApolloLink, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { getToken } from '../utils/get-token';
import { setIsRevoked } from './authEvents';
import { cache } from './cache-config';

// Environment variables
const graphqlApiUrl = import.meta.env.DEV ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_PROD_API_URL;
const projectToken = import.meta.env.VITE_PROJECT_TOKEN;

// Check for required environment variables
const requiredEnvVars = ['VITE_PROJECT_TOKEN', 'VITE_DEV_API_URL', 'VITE_PROD_API_URL', 'VITE_SIGNOUT_CHECK_INTERVAL_MINUTES'];
const missingVars = requiredEnvVars.filter((varName) => !import.meta.env[varName]);
if (missingVars.length > 0) {
  console.error(`⚠️ Error: Missing required environment variables: ${missingVars.join(', ')}`);
}

// Session cleanup function
const cleanupSession = () => {
  localStorage.clear();
  // Update the state so that the app can react
  setIsRevoked(true);
  sessionStorage.clear();
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      const errorInfo = {
        message,
        location: locations ? JSON.stringify(locations) : undefined,
        path: path ? path.join('.') : undefined,
        code: extensions?.code,
      };

      // Handle revoke token or unauthorized error
      if (extensions?.code === 'REVOKE_TOKEN_ERROR' || extensions?.code === 'UNAUTHORIZED') {
        console.error(`[Authentication Error]: ${JSON.stringify(errorInfo)}`);
        const errorMessage =
          extensions.code === 'REVOKE_TOKEN_ERROR'
            ? 'Revoke token error encountered. Clearing storage and redirecting.'
            : 'Unauthorized access error encountered. Clearing storage and redirecting.';
        console.warn(`⚠️ Warning: ${errorMessage}`);
        cleanupSession();
      } else {
        console.error(`[GraphQL error]: ${JSON.stringify(errorInfo)}`);
      }
    });
  }
  if (networkError) {
    console.error(`[Network error]: `, networkError);
    if (import.meta.env.DEV) {
      // Get more information about the network error
      if ('statusCode' in networkError) {
        console.error(`Status code: ${networkError.statusCode}`);
      }
      if ('bodyText' in networkError) {
        console.error(`Response body: ${networkError.bodyText}`);
      }
    }
  }
});

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
