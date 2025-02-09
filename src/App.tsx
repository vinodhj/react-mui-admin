import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import SessionProvider from './hooks/SessionContext';
import { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import ThemeProviderWrapper from './ThemeProviderWrapper';

const AppRoutes = lazy(() => import('./Routes/AppRoutes'));

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProviderWrapper>
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
      </ThemeProviderWrapper>
    </ApolloProvider>
  );
}

export default App;
