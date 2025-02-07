import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './components/Auth';
import { onError } from '@apollo/client/link/error';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';

const apiUrl = import.meta.env.DEV ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_PROD_API_URL;

const projectToken = import.meta.env.VITE_PROJECT_TOKEN;

// Check if token exists
const getToken = () => localStorage.getItem('access_token');

// Check if `VITE_PROJECT_TOKEN` is defined
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
  uri: `${apiUrl}/graphql`,
  credentials: 'same-origin',
});

// Add the project token to headers
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
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
  ssrMode: typeof window === 'undefined', // Disable SSR mode for Apollo
});

// Protected Route Component
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  return getToken() ? element : <Navigate to="/" replace />;
};

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="*" element={<Navigate to={getToken() ? '/dashboard' : '/'} replace />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
