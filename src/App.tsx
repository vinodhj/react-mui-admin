import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import SessionProvider from './contexts/SessionContext';
import { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const AppRoutes = lazy(() => import('./Routes/AppRoutes'));

function App() {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <Suspense
          fallback={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              <CircularProgress />
            </div>
          }
        >
          <AppRoutes />
        </Suspense>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default App;
