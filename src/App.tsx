import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import AppRoutes from './Routes/AppRoutes';
import SessionProvider from './hooks/SessionContext';

function App() {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <AppRoutes />
      </SessionProvider>
    </ApolloProvider>
  );
}

export default App;
