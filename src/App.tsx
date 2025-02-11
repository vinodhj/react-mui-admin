/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apollo-client';
import SessionProvider from './contexts/session-context';
import { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { ColorModeContext, useMode } from './theme/main-theme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';

const AppRoutes = lazy(() => import('./routes/app-routes'));

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ApolloProvider client={client}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
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
        </ThemeProvider>
      </ColorModeContext.Provider>
    </ApolloProvider>
  );
}

export default App;
