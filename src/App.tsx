import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import AppRoutes from './Routes/AppRoutes';

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
  );
}

export default App;
