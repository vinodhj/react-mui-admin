import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { getToken } from '../utils/get-token';
import { setIsRevoked } from './authEvents';

const graphqlApiUrl = import.meta.env.DEV ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_PROD_API_URL;

const projectToken = import.meta.env.VITE_PROJECT_TOKEN;

if (!projectToken) {
  console.warn('⚠️ Warning: VITE_PROJECT_TOKEN is not set in .env file');
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      // Handle revoke token error
      if (extensions?.code === 'REVOKE_TOKEN_ERROR') {
        console.warn('Revoke token error encountered. Clearing storage and redirecting.');
        localStorage.removeItem('access_token');
        localStorage.removeItem('session_admin_id');
        localStorage.removeItem('session_admin_name');
        localStorage.removeItem('session_admin_email');
        localStorage.removeItem('session_admin_role');
        localStorage.clear();

        // Update the state so that the app can react (e.g., by navigating)
        setIsRevoked(true);

        // sessionStorage.clear();
        // window.location.href = '/revoke?revokeError=true';
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = createHttpLink({
  uri: `${graphqlApiUrl}/graphql`,
  // credentials: 'same-origin',
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

const client = new ApolloClient({
  connectToDevTools: import.meta.env.DEV,
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined', // Disable SSR mode for Apollo
});

export default client;
