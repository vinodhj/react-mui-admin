import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import AppRoutes from './Routes/AppRoutes';

function App() {
  return (
    <ApolloProvider client={client}>
      <AppRoutes />
    </ApolloProvider>
  );
}

export default App;
