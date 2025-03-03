import { ApolloClient, ApolloLink, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken } from '../../utils/get-token';
import { cache } from './cache-config';
import apolloErrorLink from './error-link';

// Environment variables management
export const ENV = {
  isDev: import.meta.env.DEV,
  apiUrl: import.meta.env.DEV ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_PROD_API_URL,
  projectToken: import.meta.env.VITE_PROJECT_TOKEN,
  sidebarImageUrl: import.meta.env.VITE_SIDEBAR_IMAGE_URL,
  userAvatar: import.meta.env.VITE_AVATAR,
  signOutCheckInterval: import.meta.env.VITE_SIGNOUT_CHECK_INTERVAL_MINUTES,
};

// Check for required environment variables
const requiredEnvVars = ['VITE_PROJECT_TOKEN', 'VITE_DEV_API_URL', 'VITE_PROD_API_URL', 'VITE_SIGNOUT_CHECK_INTERVAL_MINUTES'];
const missingVars = requiredEnvVars.filter((varName) => !import.meta.env[varName]);
if (missingVars.length > 0) {
  const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}`;
  if (!ENV.isDev) throw new Error(errorMessage);
  console.error(`⚠️ ${errorMessage}`);
}

const errorLink = apolloErrorLink();

const httpLink = createHttpLink({
  uri: `${ENV.apiUrl}/graphql`,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      ...(ENV.projectToken ? { 'X-Project-Token': ENV.projectToken } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  connectToDevTools: ENV.isDev,
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache,
  ssrMode: typeof window === 'undefined', // Disable SSR mode for Apollo
  queryDeduplication: true,
  name: 'admin-client',
  version: '1.0',
});

export default client;
